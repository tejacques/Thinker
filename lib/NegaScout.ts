import GameNode = require('./GameNode')
import arrayUtils = require('./ArrayUtils')
import TT = require('./TranspositionTable')

function MoveSort<T extends GameNode.GameNode<any>>(
    me1: [GameNode.GameNode<T>, number],
    me2: [GameNode.GameNode<T>, number]) {
    return me2[1] - me1[1]
}

function OrderMoves<T extends GameNode.GameNode<any>>(
    moves: GameNode.GameNode<T>[],
    color: number,
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>) {

    var moveEntries = moves.map((move): [GameNode.GameNode<T>, number]=> {
        var value: number
        var entry: TT.Entry<GameNode.GameNode<T>>

        if (ttable && (entry = ttable.get(move))) {
            value = entry.value
        } else {
            value = move.value() * color
        }

        return [move, value]
    })

    return moveEntries.sort(MoveSort)
}

// Source: http://wikipedia.org/wiki/NegaScout
function NegaScout<T extends GameNode.GameNode<any>>(
    node: GameNode.GameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number,
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>
    ) {
    'use strict'

    var best: GameNode.GameNodeScore<T> = {
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

    var alphaOrig = alpha

    if (ttable) {
        var ttEntry = ttable.get(node)
        if (ttEntry && ttEntry.depth >= depth) {
            if (ttEntry.flag === TT.Flag.Exact) {
                best.node = ttEntry.node
                best.score == ttEntry.value
                return best
            } else if (ttEntry.flag === TT.Flag.Lowerbound) {
                alpha = Math.max(alpha, ttEntry.value)
            } else if (ttEntry.flag === TT.Flag.Upperbound) {
                beta = Math.min(beta, ttEntry.value)
            }

            if (alpha >= beta) {
                best.node = ttEntry.node
                best.endNode = ttEntry.endNode
                best.score = ttEntry.value
                return best
            }
        }
    }

    var terminal = node.isTerminal()
    if (depth === 0 || terminal) {
        best.node = node
        best.endNode = node
        best.score = color * node.value()

        return best
    }

    var iterator = node.getMoveIterator()
    var child: GameNode.GameNode<T>
    var childVal: [GameNode.GameNode<T>, number]
    var children: GameNode.GameNode<T>[] = []
    while ((child = iterator.getNext())) {
        children.push(child)
    }

    // Order the moves
    var orderedChildren = OrderMoves(children, -color, ttable)
    var cl = children.length

    for (var c = 0; c < cl; c++) {
        childVal = orderedChildren[c]
        child = childVal[0]
        var ns: GameNode.GameNodeScore<T>

        if (c !== 0) {
            ns = NegaScout(child, depth, -beta, -alpha, -color, time, start, ttable)
            ns.score = -ns.score
            if (alpha < ns.score && ns.score < beta) {
                ns = NegaScout(child, depth, -beta, -ns.score, -color, time, start, ttable)
                ns.score = -ns.score
            }
        } else {
            ns = NegaScout(child, depth, -beta, -alpha, -color, time, start, ttable)
            ns.score = -ns.score
        }

        var value = ns.score
        if (value > best.score) {
            best.score = value
            best.endNode = ns.endNode
            best.node = child
        }

        alpha = Math.max(alpha, value)
        if (alpha >= beta) {
            break
        }

        // If the node is null, we ran out of time
        if (ns.node === null) {
            return best
        }
    }

    // Transposition Table Store
    if (ttable) {
        ttEntry = ttEntry || <TT.Entry<GameNode.GameNode<T>>>{}
        ttEntry.node = node
        ttEntry.endNode = best.endNode
        ttEntry.value = best.score
        ttEntry.depth = depth
        if (best.score <= alphaOrig) {
            ttEntry.flag = TT.Flag.Upperbound
        } else if (best.score >= beta) {
            ttEntry.flag = TT.Flag.Lowerbound
        } else {
            ttEntry.flag = TT.Flag.Exact
        }
        ttable.set(ttEntry)
    }

    return best
}

/// ====== Original NegaScout

// Source: http://wikipedia.org/wiki/NegaScout
function IIDNegaScout<T extends GameNode.GameNode<any>>(
    node: GameNode.GameNode<T>,
    maxDepth: number,
    alpha: number,
    beta: number,
    color: number,
    time?: number,
    start?: number,
    ttable?: TT.TranspositionTable<GameNode.GameNode<T>>
    ) {
    'use strict'

    var best: GameNode.GameNodeScore<T> = {
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

    var alphaOrig = alpha

    if (ttable) {
        var ttEntry = ttable.get(node)
        if (ttEntry && ttEntry.depth >= maxDepth) {
            if (ttEntry.flag === TT.Flag.Exact) {
            } else if (ttEntry.flag === TT.Flag.Lowerbound) {
                alpha = Math.max(alpha, ttEntry.value)
            } else if (ttEntry.flag === TT.Flag.Upperbound) {
                beta = Math.min(beta, ttEntry.value)
            }

            if (alpha >= beta) {
                best.node = ttEntry.node
                best.endNode = ttEntry.endNode
                best.score = ttEntry.value
                return best
            }
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
    var child: GameNode.GameNode<T>
    var childVal: [GameNode.GameNode<T>, number]
    var children: GameNode.GameNode<T>[] = []
    while ((child = iterator.getNext())) {
        children.push(child)
    }

    var cl = children.length

    for (var newDepth = maxDepth-2; newDepth < maxDepth; newDepth++) {

        // Order the moves
        var orderedChildren = OrderMoves(children, -color, ttable)

        var nextBest: GameNode.GameNodeScore<T> = {
            node: null,
            endNode: null,
            score: -Infinity
        }

        alpha = alphaOrig
        
        for (var c = 0; c < cl; c++) {
            childVal = orderedChildren[c]
            child = childVal[0]
            var ns: GameNode.GameNodeScore<T>

            if (c !== 0) {
                ns = IIDNegaScout(child, newDepth, -beta, -alpha, -color, time, start, ttable)
                ns.score = -ns.score
                if (alpha < ns.score && ns.score < beta) {
                    ns = IIDNegaScout(child, newDepth, -beta, -ns.score, -color, time, start, ttable)
                    ns.score = -ns.score
                }
            } else {
                ns = IIDNegaScout(child, newDepth, -beta, -alpha, -color, time, start, ttable)
                ns.score = -ns.score
            }

            var value = ns.score
            if (value > nextBest.score) {
                nextBest.score = value
                nextBest.endNode = ns.endNode
                nextBest.node = child
            }

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

    // Transposition Table Store
    if (ttable) {
        ttEntry = ttEntry || <TT.Entry<GameNode.GameNode<T>>>{}
        ttEntry.node = node
        ttEntry.endNode = best.endNode
        ttEntry.value = best.score
        ttEntry.depth = maxDepth
        if (best.score <= alphaOrig) {
            ttEntry.flag = TT.Flag.Upperbound
        } else if (best.score >= beta) {
            ttEntry.flag = TT.Flag.Lowerbound
        } else {
            ttEntry.flag = TT.Flag.Exact
        }
        ttable.set(ttEntry)
    }

    return best
}

export = NegaScout