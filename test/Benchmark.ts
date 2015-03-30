import expect = require('expect.js');

import game = require('../lib/Game')
import GameNode = require('../lib/GameNode')
import testVars = require('./TestVars')
import negamax = require('../lib/Negamax')
import NegaScout = require('../lib/IIDNegaScout')
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

        //var gnsNS: GameNode.GameNodeScore<game.Game>
        //var nsTime = time(() => {
        //    gnsNS = NegaScout(gameNode, 10, -Infinity, Infinity, 1)
        //})

        //console.log('NegaScout score: ' + gnsNS.score + ', board (' + nsTime + 'ms):')

        //gnsNS.endNode.originalNode.history().forEach((n) => {
        //    printBoard(n.board)
        //    console.log();
        //})
        //printBoard(gnsNS.node.originalNode.board)

        var gnsNM: GameNode.GameNodeScore<game.Game>
        var nmTime = time(() => {
            gnsNM = negamax(gameNode, 10, -Infinity, Infinity, 1)
        })

        
        console.log();
        console.log();
        console.log('NegaMax score: ' + gnsNM.score + ', board (' + nmTime + 'ms):')

        gnsNM.endNode.originalNode.history().forEach((n) => {
            printBoard(n.board)
            console.log();
        })
        //printBoard(gnsNM.node.originalNode.board)

        //expect(nsTime).to.be.lessThan(nmTime)
        //var move = gns.node.originalNode.move;
        //var value = gns.node.value()
        //var playerValue = gns.node.originalNode.playerValue(0)
    })
})