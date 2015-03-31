import expect = require('expect.js');

import Game = require('../lib/Game')
import GameNode = require('../lib/GameNode')
import testVars = require('./TestVars')
import NegaMax = require('../lib/NegaMax')
import NegaScout = require('../lib/NegaScout')
import IterativeDeepening = require('../lib/IterativeDeepening')
import TT = require('../lib/TranspositionTable')
import printBoard = require('../lib/PrintBoard')

function time(fn) {
    var start = +new Date()
    fn()
    var end = +new Date()

    return end - start
}

describe('Benchmark',function() {
    this.timeout(0)

    it('should take less time to run NegaScout than NegaMax',() => {
        var gameNode = testVars.TestGame[5]
        var ttable = new TT.TranspositionTable(50000)

        var gns: GameNode.GameNodeScore<Game.Game>
        var gnsTime = time(() => {
            gns = IterativeDeepening(gameNode, NegaMax, 10, 0)
        })

        console.log('Score: ' + gns.score + ', board (' + gnsTime + 'ms):')

        return

        // ========= NegaScout ===========
        var gnsNS: GameNode.GameNodeScore<Game.Game>
        var nsTime = time(() => {
            gnsNS = NegaScout(gameNode, 10, -Infinity, Infinity, 1)
        })

        console.log('NegaScout score: ' + gnsNS.score + ', board (' + nsTime + 'ms):')

        gnsNS.endNode.originalNode.history().forEach((n) => {
            printBoard(n.board)
            console.log();
        })

        // ========= NegaMax ===========
        var gnsNM: GameNode.GameNodeScore<Game.Game>
        var nmTime = time(() => {
            gnsNM = NegaMax(gameNode, 10, -Infinity, Infinity, 1)
        })

        
        console.log();
        console.log();
        console.log('NegaMax score: ' + gnsNM.score + ', board (' + nmTime + 'ms):')

        gnsNM.endNode.originalNode.history().forEach((n) => {
            printBoard(n.board)
            console.log();
        })
    })
})