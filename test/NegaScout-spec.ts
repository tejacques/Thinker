import expect = require('expect.js');

import game = require('../lib/Game')
import testVars = require('./TestVars')
import negamax = require('../lib/Negamax')
import NegaScout = require('../lib/IIDNegaScout')
import printBoard = require('../lib/PrintBoard')

describe('NegaScout',() => {
    describe('Game', function () {
        it("should pick card 10 in boardIndex 0",() => {
            var gameNode = testVars.TestGame[0]

            var gns = NegaScout(gameNode, 10, -Infinity, Infinity, 1)
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            expect(move.boardIndex).to.be(0)
            expect(move.handIndex).to.be(1)
            expect(move.player).to.be(0)
            expect(move.card.number).to.be(10)
            expect(playerValue).to.be(5)
            expect(gns.score).to.be(1)
        });

        it("should pick card 12 in boardIndex 0",() => {
            var gameNode = testVars.TestGame[1]

            var gns = NegaScout(gameNode, 1, -Infinity, Infinity, 1)
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            expect(move.boardIndex).to.be(0)
            expect(move.handIndex).to.be(2)
            expect(move.player).to.be(0)
            expect(move.card.number).to.be(12)
            expect(playerValue).to.be(6)
            expect(gns.score).to.be(3)
        });

        it("should pick card 12 in boardIndex 1",() => {
            var gameNode = testVars.TestGame[2]

            var gns = NegaScout(gameNode, 10, -Infinity, Infinity, 1)
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            expect(move.boardIndex).to.be(1)
            expect(move.card.number).to.be(12)
            expect(move.handIndex).to.be(gameNode.players[0].hand.indexOf(12))
            expect(move.player).to.be(0)
            expect(value).to.be(1)
            expect(gns.score).to.be(3)
            expect(playerValue).to.be(4)
        })

        it("should pick card 12 in boardIndex 1 again",() => {
            var gameNode = testVars.TestGame[3]

            var gns = NegaScout(gameNode, 10, -Infinity, Infinity, 1)
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            expect(move.boardIndex).to.be(1)
            expect(move.handIndex).to.be(1)
            expect(move.player).to.be(0)
            expect(move.card.number).to.be(12)
            expect(value).to.be(0)
            expect(gns.score).to.be(-1)
            expect(playerValue).to.be(4)
        })
    })
})