import GameNode = require('./GameNode')
import TT = require('./TranspositionTable')

function IterativeDeepening<T extends GameNode.GameNode<any>>(
    node: GameNode.GameNode<T>,
    search: TT.Search,
    maxDepth: number,
    color: number,
    time?: number,
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>,
    breakCondition?: (node: GameNode.GameNode<T>) => boolean
    ) {
    'use strict'

    var best: GameNode.GameNodeScore<T> = {
        node: null,
        endNode: null,
        score: -Infinity
    }

    var start = +new Date()
    for (var depth = 1; depth <= maxDepth; depth++) {
        var nextBest = search(node, depth, -Infinity, Infinity, color, time, start, ttable)

        // nextBest.node is null if it timed out
        if (nextBest.node) {
            best = nextBest
        } else {
            break
        }

        if (breakCondition && breakCondition(best.endNode)) {
            break
        }
    }

    if (ttable) {
        console.log("Hit Rate: " + ttable.hitRate())
    }

    return best
}

export = IterativeDeepening