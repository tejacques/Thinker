import GameNode = require('./GameNode')
import NegaMax = require('./NegaMax')
import TT = require('./TranspositionTable')
import ArrayUtils = require('./ArrayUtils')

// Source: http://wikipedia.org/wiki/Negamax
function NegaMaxHelper<T extends GameNode.GameNode<any>> (
    node: GameNode.GameNode<T>,
    depth: number,
    color: number,
    timer?: {
        timedout: boolean
        timeout: number
        start: number
    },
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>
    ): GameNode.GameNodeScore<T> {
    'use strict'

    var best = {
        score: -Infinity,
        depthReached: depth,
        node: null
    }

    if (depth <= 0 || node.isTerminal()) {
        return best
    }

    var iterator = node.getMoveIterator()
    var child: GameNode.GameNode<T>

    var beta = Infinity
    var alpha = -Infinity
    //var childrenScores: [GameNode.GameNode<T>, number][] = []
    while ((child = iterator.getNext())) {
        var value = -NegaMax(child, depth - 1, -beta, -alpha, -color, timer, ttable)

        // Check if we ran out of time
        if (timer && timer.timedout) {
            best.score = -Infinity
            best.depthReached = -1
            best.node = null
            return best
        }

        if (value > best.score) {
            best.score = value
            best.node = child
        }

        alpha = Math.max(alpha, value)
        if (alpha >= beta) {
            break
        }

        //childrenScores.push([child, value]);
    }

    //var nsrs = childrenScores.slice()
    //ArrayUtils.numericSort(nsrs, ns => ns[1], true)

    //console.log('sorted order:')

    //nsrs.forEach(ns => {
    //    var move = (<any>ns[0]).move
    //    console.log(ns[1], { boardIndex: move.boardIndex, handIndex: move.handIndex })
    //})
    //console.log('actual order:')
    //childrenScores.forEach(ns => {
    //    var move = (<any>ns[0]).move
    //    console.log(ns[1], { boardIndex: move.boardIndex, handIndex: move.handIndex })
    //})
    //console.log('picked: ', best.score, ', move: ', best.node.move)

    return best
}

export = NegaMaxHelper
