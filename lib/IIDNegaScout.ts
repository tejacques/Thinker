import game = require('./GameNode')
import negamax = require('./Negamax')
type Options = game.Options

// Source: http://wikipedia.org/wiki/Negamax
function NegaScout<T extends game.GameNode<any>>(
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
        score: -Infinity
    }

    if (time) {
        var now = +new Date()
        var elapsed = now - start
        if (elapsed >= time) {
            return best
        }
    }

    if (depth === 0 || node.isTerminal()) {
        best.node = node
        best.score = color * node.value()

        return best
    }

    var iterator = node.getMoveIterator()
    var child: game.GameNode<T>
    var children: [game.GameNode<T>, number][] = []
    while ((child = iterator.getNext())) {
        children.push([child, color * child.value()])
    }

    var cl = children.length
    var childrenSort = (childValue1, childValue2) => {
        return childValue1[1] - childValue2[1]
    }
    for (var d = 0; d < depth; d++) {

        children.sort(childrenSort)
        
        for (var c = 0; c < cl; c++) {
            var childVal = children[c]
            child = childVal[0]
            var ns = negamax(child, depth - 1, -beta, -alpha, -color, time, start)
            ns.score = -ns.score
            var value = ns.score
            childVal[1] = value
            if (value > best.score) {
                best.score = value
                best.node = child
            }
            alpha = Math.max(alpha, value)
            if (alpha >= beta) {
                break
            }

            // If the node is null, we ran out of time
            if (ns.node === null) {
                return best
            }
        }
    }
}

export = NegaScout