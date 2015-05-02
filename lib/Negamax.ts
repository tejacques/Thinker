import GameNode = require('./GameNode')
import TT = require('./TranspositionTable')

// Source: http://wikipedia.org/wiki/Negamax
function NegaMax<T extends GameNode.GameNode<any>> (
    node: GameNode.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number,
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>
    ) {
    'use strict'

    var best: GameNode.GameNodeScore<T> = {
        node: null,
        endNode: null,
        score: -Infinity
    }

    if (time && start) {
        var now = +new Date()
        var elapsed = now - start
        if (elapsed >= time) {
            return best
        }
    }

    var alphaOrig = alpha
    var ttEntry: TT.Entry<GameNode.GameNode<T>>

    if (ttable) {
        ttEntry = ttable.get(node)
        if (ttEntry && ttEntry.depth >= depth) {
            if (ttEntry.flag === TT.Flag.Exact) {
            } else if (ttEntry.flag === TT.Flag.Lowerbound) {
                alpha = Math.max(alpha, ttEntry.value)
            } else if (ttEntry.flag === TT.Flag.Upperbound) {
                beta = Math.min(beta, ttEntry.value)
            }

            if (alpha >= beta) {
                best.node = ttEntry.node
                best.endNode = ttEntry.endNode
                best.score = ttEntry.value
                return best
            }
        }
    }

    if (depth === 0 || node.isTerminal()) {
        best.node = node
        best.endNode = node
        best.score = color * node.value()

        return best
    }
    var iterator = node.getMoveIterator()
    var child: GameNode.GameNode<T>
    while ((child = iterator.getNext())) {
        var ns = NegaMax(child, depth - 1, -beta, -alpha, -color, time, start, ttable)
        ns.score = -ns.score

        // If the node is null, we ran out of time
        if (ns.node === null) {
            break
        }

        var value = ns.score
        if (value > best.score) {
            best.score = value
            best.node = child
            best.endNode = ns.endNode
        }
        alpha = Math.max(alpha, value)
        if (alpha >= beta) {
            break
        }
    }

    // Transposition Table Store
    if (ttable) {
        ttEntry = ttEntry || <TT.Entry<GameNode.GameNode<T>>>{}
        ttEntry.node = node
        ttEntry.endNode = best.endNode
        ttEntry.value = best.score
        ttEntry.depth = depth
        if (best.score <= alphaOrig) {
            ttEntry.flag = TT.Flag.Upperbound
        } else if (best.score >= beta) {
            ttEntry.flag = TT.Flag.Lowerbound
        } else {
            ttEntry.flag = TT.Flag.Exact
        }
        ttable.set(ttEntry)
    }

    return best
}

export = NegaMax
