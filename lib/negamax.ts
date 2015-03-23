import game = require('./GameNode')
type Options = game.Options

function negamax<T extends game.GameNode<any>>(
    node: game.GameNode<T>,
    options?: Options
    ): game.GameNodeScore<T> {
    'use strict'
    var best: game.GameNodeScore<T> = {
        node: null,
        score: -Infinity
    }
    var opts = options || <Options>{}
    var color = opts.color || -1
    var depth = opts.depth || 10

    // Source: http://wikipedia.org/wiki/Negamax
    var negamax = function(
        node: game.GameNode<T>,
        depth: number,
        alpha: number,
        beta: number,
        color: number) {
        if (depth === 0 || node.isTerminal()) {
            return color * node.value()
        }

        var bestValue = -Infinity
        var iterator = node.getMoveIterator()
        var child: game.GameNode<T>
        while ( (child = iterator.getNext()) ) {
            var value = -negamax(child, depth - 1, -beta, -alpha, -color)
            bestValue = Math.max(value, bestValue)
            var skip = Math.max(alpha, value) >= beta
            if (skip) {
                break
            }
        }

        return bestValue
    }

    // return node with highest score
    var iterator = node.getMoveIterator()
    var child: game.GameNode<T>
    while ((child = iterator.getNext())) {
        var score = color * negamax(child, depth, -Infinity, Infinity, color)
        if (score <= best.score) {
            // Don't take this move if it's equal or worse
            // Take this move if it's better than our current best
            best.node = child
            best.score = score
        }
        best.node = child
        best.score = score
    }

    return best
}

export = negamax