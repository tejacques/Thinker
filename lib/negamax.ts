import game = require('./GameNode')
type Options = game.Options

function negamax<T extends game.GameNode<any>>(
    node: game.GameNode<T>,
    options?: Options
    ): game.GameNodeScore<T> {
    'use strict'
    
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
            //return color * node.value()
            return {
                node: node,
                score: color * node.value()
            }
        }

        var best: game.GameNodeScore<T> = {
            node: null,
            score: -Infinity
        }
        var iterator = node.getMoveIterator()
        var child: game.GameNode<T>
        while ( (child = iterator.getNext()) ) {
            var ns = negamax(child, depth - 1, -beta, -alpha, -color)
            ns.score = -ns.score
            var value = ns.score
            if (value > best.score) {
                best.score = value
                best.node = child
            }
            alpha = Math.max(alpha, value)
            if (alpha >= beta) {
                break
            }
        }

        return best
    }

    return negamax(node, depth, -Infinity, Infinity, color)
}

export = negamax