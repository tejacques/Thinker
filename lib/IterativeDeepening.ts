import GameNode = require('./GameNode')
import TT = require('./TranspositionTable')
import ArrayUtils = require('./ArrayUtils')
import NegaMaxHelper = require('./NegaMaxHelper')

function IterativeDeepening<T extends GameNode.GameNode<any>>(
    node: GameNode.GameNode<T>,
    search: TT.Search,
    maxDepth: number,
    color: number,
    time?: number,
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>,
    breakCondition?: (depthReached: number) => boolean
    ) {
    'use strict'

    var best: GameNode.GameNodeScore<T> = {
        node: null,
        depthReached: null,
        score: -Infinity
    }

    var start = Date.now()

    var iterator = node.getMoveIterator()
    var child: GameNode.GameNode<T>
    var nodeScores: [GameNode.GameNode<T>, number][] = []
    var timer = time ? {
        timedout: false,
        timeout: time,
        start: Date.now(),
    } : null

    while ((child = iterator.getNext())) {
        nodeScores.push([child, 1])
    }
    var nodeScoresLen = nodeScores.length
    for (var depth = 1; depth <= maxDepth; depth++) {



        //var nextBest = NegaMaxHelper(node, depth, color, timer, ttable)

        //if (!timer.timedout) {
        //    best = nextBest
        //}

        // Largest value first
        var alpha = -Infinity
        var beta = Infinity
        var nextScore = -Infinity
        for (var nsIndex = 0; nsIndex < nodeScoresLen; nsIndex++) {
            child = nodeScores[nsIndex][0]
            console.log('depth: ', depth, ' alpha: ', alpha)
            var value = -search(child,
                depth - 1,
                -beta,
                -alpha,
                -color,
                timer,
                ttable)

            nextScore = Math.max(nextScore, value)
            //nodeScores[nsIndex][1] = value
            if (alpha >= value) {
                // LOWER BOUND
                nodeScores[nsIndex][1] = value - 1 // The sort is apparently
                // not a stable one, so this is necessary
            } else {
                nodeScores[nsIndex][1] = value
            }
            alpha = Math.max(alpha, value)


            if (timer && timer.timedout) {
                break
            }
        }

        if (timer && timer.timedout) {
            break
        } else {
            var nsrs = nodeScores//.slice()
            ArrayUtils.numericSort(nsrs, ns => ns[1], true)
            best.node = nsrs[0][0]
            best.score = nsrs[0][1]
            best.depthReached = depth
            //console.log('sorted order:')

            //nsrs.forEach(ns => {
            //    var move = (<any>ns[0]).move
            //    console.log(ns[1], { boardIndex: move.boardIndex, handIndex: move.handIndex })
            //})
            //console.log('actual order:')
            //nodeScores.forEach(ns => {
            //    var move = (<any>ns[0]).move
            //    console.log(ns[1], { boardIndex: move.boardIndex, handIndex: move.handIndex })
            //})
            //console.log('picked: ', best.score, ', move: ', (<any>best.node).move)
        }

        if (breakCondition && breakCondition(best.depthReached)) {
            break
        }
    }

    if (ttable) {
        console.log("Hit Rate: " + ttable.hitRate())
    }

    return best
}

export = IterativeDeepening
