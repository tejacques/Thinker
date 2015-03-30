import game = require('./GameNode')
import negamax = require('./Negamax')
import arrayUtils = require('./ArrayUtils')
type Options = game.Options


//function IterativeDeepening<T extends game.GameNode<any>>(
//    node: game.GameNode<T>,
//    maxDepth: number,
//    alpha: number,
//    beta: number,
//    color: number,
//    time?: number,
//    start?: number) {
//    var best: game.GameNodeScore<T> = {
//        node: null,
//        score: -Infinity
//    }

//    for (var newDepth = 0; newDepth <= maxDepth; newDepth++) {
//        var newBest = NegaScout2(node, newDepth, alpha, beta, color, time, start)

//        // If we timed out, return current best
//        if (!newBest.node) {
//            return best
//        }

//        best = newBest
//    }

//    return best
//}

//function NegaScout2<T extends game.GameNode<any>>(
//    node: game.GameNode<T>,
//    depth: number,
//    alpha: number,
//    beta: number,
//    color: number,
//    time?: number,
//    start?: number) {
//    'use strict'

//    var best: game.GameNodeScore<T> = {
//        node: null,
//        score: -Infinity
//    }

//    if (time) {
//        var now = +new Date()
//        var elapsed = now - start
//        if (elapsed >= time) {
//            return best
//        }
//    }

//    if (depth === 0 || node.isTerminal()) {
//        best.node = node
//        best.score = color * node.value()

//        return best
//    }

//    var iterator = node.getMoveIterator()
//    var child: game.GameNode<T>
//    var childVal: [game.GameNode<T>, number]
//    var children: [game.GameNode<T>, number][] = []
//    while ((child = iterator.getNext())) {
//        children.push([child, color * child.value()])
//    }

//    var cl = children.length
//    var childrenSort = (childValue1, childValue2) => {
//        return childValue2[1] - childValue1[1]
//    }

//    // Check to see if children are terminal
//    if (children[0][0].isTerminal()) {
//        childVal = arrayUtils.maxProjection(children, cv => cv[1])
//        //children.sort(childrenSort)
//        //childVal = children[0]
//        best.node = childVal[0]
//        best.score = childVal[1]

//        return best
//    }

//    children.sort(childrenSort)

//    childVal = children[0]
//    best.node = childVal[0]
//    best.score = childVal[1]

//    for (var c = 0; c < cl; c++) {
//        childVal = children[c]
//        child = childVal[0]
//        var ns: game.GameNodeScore<T>

//        if (c !== 0) {
//            ns = IterativeDeepening(child, depth-1, -beta, -alpha, -color, time, start)
//            ns.score = -ns.score
//            if (alpha < ns.score && ns.score < beta) {
//                ns = IterativeDeepening(child, depth-1, -beta, -ns.score, -color, time, start)
//                ns.score = -ns.score
//            }
//        } else {
//            ns = IterativeDeepening(child, depth-1, -beta, -alpha, -color, time, start)
//            ns.score = -ns.score
//        }

//        var value = ns.score
//        childVal[1] = value
//        if (value > best.score) {
//            best.score = value
//            best.node = child
//        }

//        alpha = Math.max(alpha, value)
//        if (alpha >= beta) {
//            break
//        }

//        // If the node is null, we ran out of time
//        if (ns.node === null) {
//            return best
//        }
//    }

//    return best
//}

/// ====== Original NegaScout

// Source: http://wikipedia.org/wiki/Negamax
function NegaScout<T extends game.GameNode<any>>(
    node: game.GameNode<T>,
    maxDepth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number) {
    'use strict'

    var best: game.GameNodeScore<T> = {
        node: null,
        endNode: null,
        score: -Infinity
    }

    if (time) {
        var now = +new Date()
        var elapsed = now - start
        if (elapsed >= time) {
            return best
        }
    }

    var terminal = node.isTerminal()
    if (maxDepth === 0 || terminal) {
        best.node = node
        best.endNode = node
        best.score = color * node.value()

        return best
    }

    var iterator = node.getMoveIterator()
    var child: game.GameNode<T>
    var childVal: [game.GameNode<T>, number, game.GameNode<T>]
    var children: [game.GameNode<T>, number, game.GameNode<T>][] = []
    while ((child = iterator.getNext())) {
        children.push([child, color * child.value(), child])
    }

    var cl = children.length
    var childrenSort = (childValue1, childValue2) => {
        return childValue2[1] - childValue1[1]
    }

    // Check to see if children are terminal
    if (children[0][0].isTerminal()) {
        childVal = arrayUtils.maxProjection(children, cv => cv[1])
        //children.sort(childrenSort)
        //childVal = children[0]
        best.node = childVal[0]
        best.endNode = childVal[0]
        best.score = childVal[1]

        return best
    }

    var startingAlpha = alpha

    for (var newDepth = 0; newDepth < maxDepth; newDepth++) {

        children.sort(childrenSort)

        var nextBest: game.GameNodeScore<T> = {
            node: null,
            endNode: null,
            score: -Infinity
        }

        //childVal = children[0]
        //best.node = childVal[0]
        //best.endNode = childVal[2]
        //best.score = childVal[1]

        alpha = startingAlpha
        
        for (var c = 0; c < cl; c++) {
            childVal = children[c]
            child = childVal[0]
            var ns: game.GameNodeScore<T>

            if (c !== 0) {
                ns = NegaScout(child, newDepth, -beta, -alpha, -color, time, start)
                ns.score = -ns.score
                if (alpha < ns.score && ns.score < beta) {
                    ns = NegaScout(child, newDepth, -beta, -ns.score, -color, time, start)
                    ns.score = -ns.score
                }
            } else {
                ns = NegaScout(child, newDepth, -beta, -alpha, -color, time, start)
                ns.score = -ns.score
            }

            var value = ns.score
            childVal[1] = value
            childVal[2] = ns.endNode
            if (value > nextBest.score) {
                nextBest.score = value
                nextBest.endNode = ns.endNode
                nextBest.node = child
            }
            //if (value > best.score) {
            //    best.score = value
            //    best.endNode = ns.endNode
            //    best.node = child
            //}

            alpha = Math.max(alpha, value)
            if (alpha >= beta) {
                break
            }

            // If the node is null, we ran out of time
            if (ns.node === null) {
                return best
            }
        }

        best = nextBest

    }

    return best
}

export = NegaScout