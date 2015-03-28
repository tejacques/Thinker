import game = require('./GameNode')
type Options = game.Options

// Source: http://wikipedia.org/wiki/Negamax
function negamax<T extends game.GameNode<any>> (
    node: game.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number) {
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

    if (depth === 0 || node.isTerminal()) {
        best.node = node
        best.endNode = node
        best.score = color * node.value()

        return best
    }
    var iterator = node.getMoveIterator()
    var child: game.GameNode<T>
    while ((child = iterator.getNext())) {
        var ns = negamax(child, depth - 1, -beta, -alpha, -color, time, start)
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

    return best
}

export = negamax