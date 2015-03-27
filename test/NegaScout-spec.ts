import expect = require('expect.js');

import game = require('../lib/Game')
import NegaScout = require('../lib/IIDNegaScout')
import printBoard = require('../lib/PrintBoard')

describe('NegaScout',() => {
    describe('Game', function () {
        it("should pick card 10 in boardIndex 0",() => {
            var board = [
                null, new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
                new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
                new game.PlayerCard(1, 0), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
            ]
            var player1 = new game.Player([1, 10, null, null, null], [])
            var player2 = new game.Player([null, null, null, null, null], [])
            var gameNode = new game.Game(
                board,
                [player1, player2],
                8,
                0,
                game.RuleSetFlags.None
                )

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
    })
})