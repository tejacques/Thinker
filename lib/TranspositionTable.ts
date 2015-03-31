import LRU = require('lru-cache')
import GameNode = require('./GameNode')

var cache = LRU(50000)

export enum Flag {
    Exact,
    Upperbound,
    Lowerbound,
}

export interface Entry<T> {
    depth: number
    flag: Flag
    node: T
    endNode: T
    value: number
}

export class TranspositionTable<T extends GameNode.GameNode<any>> {
    accesses: number = 0
    hits: number = 0
    private cache: LRU.Cache<Entry<T>>
    constructor(max) {
        this.cache = LRU<Entry<T>>(max)
    }
    get(node: T): Entry<T> {
        this.accesses++
        var entry = this.cache.get(node.toString())
        if (entry) {
            this.hits++
        }
        return entry
    } 
    set(entry: Entry<T>) {
        return this.cache.set(entry.node.toString(), entry)
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
    time?: number,
    start?: number,
    ttable?: TranspositionTable<GameNode.GameNode<T>>
) => GameNode.GameNodeScore<T>

export type ExtensibleSearch = <T extends GameNode.GameNode<any>>(
    node: GameNode.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number,
    search?: any
) => GameNode.GameNodeScore<T>

// A generic wrapper which takes a search function and puts a TranspositionTable
// around it
export function UseTranspositionTable<T extends GameNode.GameNode<any>>(
    search: ExtensibleSearch,
    ttable: TranspositionTable<GameNode.GameNode<T>>) {

    var ttSearch: ExtensibleSearch = (
        node: GameNode.GameNode<T>,
        depth: number,
        alpha: number,
        beta: number,
        color: number,
        time?: number,
        start?: number,
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
                    return {
                        node: ttEntry.node,
                        endNode: ttEntry.endNode,
                        score: ttEntry.value
                    }
                }
            }
        }

        var best = search(node, depth, alpha, beta, color, time, start, ttSearch)

        // Transposition Table Store
        if (ttable) {
            ttEntry = ttEntry || <Entry<GameNode.GameNode<T>>>{}
            ttEntry.node = node
            ttEntry.endNode = best.endNode
            ttEntry.value = best.score
            ttEntry.depth = depth
            if (best.score <= alphaOrig) {
                ttEntry.flag = Flag.Upperbound
            } else if (best.score >= beta) {
                ttEntry.flag = Flag.Lowerbound
            } else {
                ttEntry.flag = Flag.Exact
            }
            ttable.set(ttEntry)
        }

        return best
    }

    return ttSearch
}