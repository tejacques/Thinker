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
    var generateMoves: (node: GameNode) => GameNode[] =
        opts.generateMoves || node.generateMoves
    var heuristic = opts.heuristic || node.value
    var isTerminal = opts.isTerminal || node.isTerminal

    // Source: http://wikipedia.org/wiki/Negamax
    var negamax = function(
        node: GameNode,
        depth: number,
        alpha: number,
        beta: number,
        color: number) {
        if (depth === 0 || node.isTerminal()) {
            return color * heuristic(node)
        }

        var bestValue = -Infinity
        var childNodes = generateMoves(node)
        childNodes.forEach((child) => {
            var value = -negamax(child, depth - 1, -beta, -alpha, -color)
            bestValue = Math.max(value, bestValue)
            var skip = Math.max(alpha, value) >= beta
            if (skip) return false
        })

        return bestValue
    }

    // return node with highest score
    var childNodes = generateMoves(node)
    childNodes.forEach((child) => {
        var score = color * negamax(child, depth, -Infinity, Infinity, color)
        if (score <= best.score) {
            // Don't take this move if it's equal or worse
            // Take this move if it's better than our current best
            best.node = child
            best.score = score
        }
        best.node = child
        best.score = score
    })

    return best
}

export = negamax