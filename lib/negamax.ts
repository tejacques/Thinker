import game = require('./GameNode')
type GameNode = game.GameNode
type GameNodeScore = game.GameNodeScore
type Options = game.Options

function negamax (node: GameNode, options: Options): GameNodeScore {
    'use strict'
    var best: GameNodeScore = {
        node: null,
        score: -Infinity
    }
    var opts = options || <Options>{}
    var color = opts.color || -1
    var depth = opts.depth || 10

    // Source: http://wikipedia.org/wiki/Negamax
    var negamax = function(
        node: GameNode,
        depth: number,
        alpha: number,
        beta: number,
        color: number) {
        if (depth === 0 || node.isTerminal()) {
            return color * node.value()
        }

        var bestValue = -Infinity
        var iterator = node.getMoveIterator()
        var child: GameNode
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
    var child: GameNode
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