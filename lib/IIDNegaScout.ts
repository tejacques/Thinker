import game = require('./GameNode')
type Options = game.Options

// Source: http://wikipedia.org/wiki/Negamax
function negamax<T extends game.GameNode<any>>(
    node: game.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    time: number,
    start: number) {
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
}


function NegaScoutWrapper<T extends game.GameNode<any>>(
    node: game.GameNode<T>,
    options?: Options
    ) {

    var opts = options || <Options>{}
    var color = opts.color || -1
    var depth = opts.depth || 10
    var time = opts.time || 0
    var start = +new Date()
}

export = NegaScoutWrapper