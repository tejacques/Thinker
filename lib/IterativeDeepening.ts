import GameNode = require('./GameNode')
import TT = require('./TranspositionTable')
import ArrayUtils = require('./ArrayUtils')

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
        // Largest value first
        var alpha = -Infinity
        var beta = Infinity
        var nextScore = -Infinity
        for (var nsIndex = 0; nsIndex < nodeScoresLen; nsIndex++) {
            child = nodeScores[nsIndex][0]
            var value = -search(node,
                depth - 1,
                -beta,
                -alpha,
                -color,
                timer,
                ttable)

            nextScore = Math.max(nextScore, value)
            alpha = Math.max(alpha, value)
            nodeScores[nsIndex][1] = value

            if (timer && timer.timedout) {
                break
            }
        }

        if (timer && timer.timedout) {
            break
        } else {
            ArrayUtils.numericSort(nodeScores, ns => ns[1], true)
            best.node = nodeScores[0][0]
            best.score = nodeScores[0][1]
            best.depthReached = depth
            console.log(nodeScores.map(ns => (ns[1])))
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