import ArrayUtils = require('./ArrayUtils')
import GameNode = require('./GameNode')
import TT = require('./TranspositionTable')
import Choose = require('./Choose')

// Source: http://wikipedia.org/wiki/Negamax
function ExpectiNegaMax<T extends GameNode.PDGameNode<any>> (
    node: GameNode.PDGameNode<T>,
    depth: number,
    alpha: number,
    beta: number,
    color: number,
    timedout: { timeout: boolean },
    time?: number,
    start?: number,
    ttable?: TT.TranspositionTable<GameNode.PDGameNode<T>>
    ) {
    'use strict'

    var score = -Infinity

    if (time && start) {
        var now = +new Date()
        var elapsed = now - start
        if (elapsed >= time) {
            return null
        }
    }

    var alphaOrig = alpha
    var ttEntry: TT.Entry

    if (ttable) {
        ttEntry = ttable.get(node)
        if (ttEntry && ttEntry.depth >= depth) {
            if (ttEntry.flag === TT.Flag.Exact) {
                return ttEntry.value
            } else if (ttEntry.flag === TT.Flag.Lowerbound) {
                alpha = Math.max(alpha, ttEntry.value)
            } else if (ttEntry.flag === TT.Flag.Upperbound) {
                beta = Math.min(beta, ttEntry.value)
            }

            if (alpha >= beta) {
                return ttEntry.value
            }
        }
    }

    if (depth === 0 || node.isTerminal()) {
        score = color * node.value()
        return score
    }
    var child: GameNode.PDGameNode<T>

    var deterministicMoves = node.getDeterministicMoves()
    var i: number
    var len: number

    len = deterministicMoves.length
    var value: number
    for (i = 0; i < len; i++) {
        child = deterministicMoves[i];

        // TODO: This is where applying the move would go if it were mutable

        value = -ExpectiNegaMax(
            child,
            depth - 1,
            -beta,
            -alpha,
            -color,
            timedout,
            time,
            start,
            ttable)

        // TODO: This is where unapplying the move would go if it were mutable

        if (timedout.timeout) {
            break
        }

        score = Math.max(score, value)
        alpha = Math.max(alpha, value)
        if (alpha >= beta) {
            break
        }
    }

    if (alpha < beta) {
        var probabilisticMoves = node.getProbabilisticMoves();
        len = probabilisticMoves.length
        var probabilisticScore: number = 0
        var cutoffScore = beta * len
        var moveIndexValue: [number, number][]
        var pCardInHand: number
        for (i = 0; i < len; i++) {
            child = probabilisticMoves[i][1];
            pCardInHand = probabilisticMoves[i][0]
            // TODO: This is where applying the move would go if it were mutable

            value = -ExpectiNegaMax(
                child,
                depth - 1,
                -beta,
                -alpha,
                -color,
                timedout,
                time,
                start,
                ttable)

            // TODO: This is where unapplying the move would go if it were mutable

            if (timedout.timeout) {
                break
            }

            // The player would only play this card if they didn't already
            // have a better move deterministically
            //if (value >= alpha) {
            //}

            probabilisticScore += value
            if (probabilisticScore >= cutoffScore) {
                alpha = beta
                score = beta
                break
            }
            moveIndexValue.push([pCardInHand, value])
        }

        if (alpha < beta) {
            ArrayUtils.numericSort(moveIndexValue, iv => iv[1], true)
            len = moveIndexValue.length
            value = 0
            var cumulativeProbability = 0
            for (i = 0; i < len; i++) {
                var pWillPlay = node.pBestMove(i, len)
                var moveValue = moveIndexValue[i][1]
                value += pWillPlay * moveValue
            }

            score = Math.max(score, value)
        }
    }

    // Transposition Table Store
    if (ttable) {
        ttEntry = ttEntry || <TT.Entry>{}
        ttEntry.value = score
        ttEntry.depth = depth
        if (score <= alphaOrig) {
            ttEntry.flag = TT.Flag.Upperbound
        } else if (score >= beta) {
            ttEntry.flag = TT.Flag.Lowerbound
        } else {
            ttEntry.flag = TT.Flag.Exact
        }
        ttable.set(node, ttEntry)
    }

    return score
}

export = ExpectiNegaMax