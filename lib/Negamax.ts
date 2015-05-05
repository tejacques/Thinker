import GameNode = require('./GameNode')
import TT = require('./TranspositionTable')

// Source: http://wikipedia.org/wiki/Negamax
function NegaMax<T extends GameNode.GameNode<any>> (
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
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>
    ): number {
    'use strict'

    var score = -Infinity

    if (timer) {
        var now = Date.now()
        var elapsed = now - timer.start
        if (elapsed >= timer.timeout) {
            timer.timedout = true
            return score
        }
    }

    var alphaOrig = alpha
    var ttEntry: TT.Entry

    if (ttable) {
        ttEntry = ttable.get(node)
        if (ttEntry && ttEntry.depth >= depth) {
            if (ttEntry.flag === TT.Flag.Exact) {
                return ttEntry.value
            } else if (ttEntry.flag === TT.Flag.Lowerbound) {
                alpha = Math.max(alpha, ttEntry.value)
            } else if (ttEntry.flag === TT.Flag.Upperbound) {
                beta = Math.min(beta, ttEntry.value)
            }

            if (alpha >= beta) {
                return ttEntry.value
            }
        }
    }

    if (depth === 0 || node.isTerminal()) {
        return color * node.value()
    }
    var iterator = node.getMoveIterator()
    var child: GameNode.GameNode<T>
    while ((child = iterator.getNext())) {
        var value = -NegaMax(child, depth - 1, -beta, -alpha, -color, timer, ttable)

        // Check if we ran out of time
        if (timer && timer.timedout) {
            return -Infinity
        }

        score = Math.max(score, value)
        alpha = Math.max(alpha, value)
        if (alpha >= beta) {
            break
        }
    }

    // Transposition Table Store
    if (ttable) {
        ttEntry = ttEntry || <TT.Entry>{}
        ttEntry.value = score
        ttEntry.depth = depth
        if (score <= alphaOrig) {
            ttEntry.flag = TT.Flag.Upperbound
        } else if (score >= beta) {
            ttEntry.flag = TT.Flag.Lowerbound
        } else {
            ttEntry.flag = TT.Flag.Exact
        }
        ttable.set(node, ttEntry)
    }

    return score
}

export = NegaMax
