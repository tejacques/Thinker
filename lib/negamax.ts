import game = require('./GameNode')
import TT = require('./TranspositionTable')
type Options = game.Options

// Source: http://wikipedia.org/wiki/Negamax
function negamax<T extends game.GameNode<any>> (
    node: game.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number,
    ttable?: TT.TranspositionTable<game.GameNode<T>>) {
    'use strict'

    var best: game.GameNodeScore<T> = {
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

    //ttable = ttable || new TT.TranspositionTable<T>(50000)
    var alphaOrig = alpha

    if (ttable) {
        var ttEntry = ttable.get(node)
        if (ttEntry && ttEntry.depth >= depth) {
            if (ttEntry.flag === TT.Flag.Exact) {
            } else if (ttEntry.flag === TT.Flag.Lowerbound) {
            } else if (ttEntry.flag === TT.Flag.Upperbound) {
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
    var child: game.GameNode<T>
    while ((child = iterator.getNext())) {
        var ns = negamax(child, depth - 1, -beta, -alpha, -color, time, start, ttable)
        ns.score = -ns.score
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

        // If the node is null, we ran out of time
        if (ns.node === null) {
            break
        }
    }

    // Transposition Table Store
    if (ttable) {
        ttEntry = ttEntry || <TT.Entry<game.GameNode<T>>>{}
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

export = negamax