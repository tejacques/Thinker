import GameNode = require('./GameNode')
import ZobristHash = require('./ZobristHash')


export enum Flag {
    Exact,
    Upperbound,
    Lowerbound,
}

export interface Entry {
    low: number
    high: number
    depth: number
    flag: Flag
    value: number
}

export class TranspositionTable<T extends GameNode.Node<any>> {
    accesses: number = 0
    hits: number = 0
    private table: Entry[] = Array(ZobristHash.mask+1)
    constructor(max) {
    }
    get(node: T): Entry {
        this.accesses++
        var entry = this.table[node.zobristLow & ZobristHash.mask]
        if (entry
            && entry.low === node.zobristLow
            && entry.high === node.zobristHigh) {
            this.hits++
            return entry
        }
        return null
    } 
    set(node: T, entry: Entry) {
        return this.table[node.zobristLow & ZobristHash.mask] = entry
    }
    hitRate() {
        return this.hits / this.accesses
    }
}

export type Search = <T extends GameNode.GameNode<any>>(
    node: GameNode.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    timer?: {
        timedout: boolean
        timeout: number
        start: number
    },
    ttable?: TranspositionTable<GameNode.GameNode<T>>
) => number
export type ExtensibleSearch = <T extends GameNode.Node<any>>(
    node: GameNode.Node<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    timer?: {
        timedout: boolean
        timeout: number
        start: number
    },
    search?: any
) => number

// A generic wrapper which takes a search function and puts a TranspositionTable
// around it
export function UseTranspositionTable<T extends GameNode.Node<any>>(
    search: ExtensibleSearch,
    ttable: TranspositionTable<GameNode.Node<T>>) {

    var ttSearch: ExtensibleSearch = (
        node: GameNode.Node<T>,
        depth: number,
        alpha: number,
        beta: number,
        color: number,
        timer?: {
            timedout: boolean
            timeout: number
            start: number
        },
        searchArg?: ExtensibleSearch) => {

        var alphaOrig = alpha

        if (ttable) {
            var ttEntry = ttable.get(node)
            if (ttEntry && ttEntry.depth >= depth) {
                if (ttEntry.flag === Flag.Exact) {
                } else if (ttEntry.flag === Flag.Lowerbound) {
                    alpha = Math.max(alpha, ttEntry.value)
                } else if (ttEntry.flag === Flag.Upperbound) {
                    beta = Math.min(beta, ttEntry.value)
                }

                if (alpha >= beta) {
                    return ttEntry.value
                }
            }
        }

        var score = search(
            node,
            depth,
            alpha,
            beta,
            color,
            timer,
            ttSearch)

        if (timer && timer.timedout) {
            return score
        }

        // Transposition Table Store
        if (ttable) {
            ttEntry = ttEntry || <Entry>{}
            ttEntry.value = score
            ttEntry.depth = depth
            if (score <= alphaOrig) {
                ttEntry.flag = Flag.Upperbound
            } else if (score >= beta) {
                ttEntry.flag = Flag.Lowerbound
            } else {
                ttEntry.flag = Flag.Exact
            }
            ttable.set(node, ttEntry)
        }

        return score
    }

    return ttSearch
}