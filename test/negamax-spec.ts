﻿import expect = require('expect.js');

import game = require('../lib/Game')
import negamax = require('../lib/negamax')

describe("Negamax", () => {
    
    describe("Game", function () {
        it("should pick card 10 in boardIndex 0",() => {
            var board = [
                null,                      new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
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

            var gns = negamax(gameNode, { depth: 1, color: 1 })
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            expect(move.boardIndex).to.be(0)
            expect(move.handIndex).to.be(1)
            expect(move.player).to.be(0)
            expect(move.card.number).to.be(10)
            expect(playerValue).to.be(5)
            //expect(gns.score).to.be(5)
        });

        it("should pick card 12 in boardIndex 0",() => {
            var board = [
                null,                      new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
                new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
                new game.PlayerCard(1, 0), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
            ]
            var player1 = new game.Player([1, 9, 12, null, null], [])
            var player2 = new game.Player([null, null, null, null, null], [])
            var gameNode = new game.Game(
                board,
                [player1, player2],
                8,
                0,
                game.RuleSetFlags.None
            )

            var gns = negamax(gameNode, { depth: 1, color: 1 })
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            expect(move.boardIndex).to.be(0)
            expect(move.handIndex).to.be(2)
            expect(move.player).to.be(0)
            expect(move.card.number).to.be(12)
            expect(playerValue).to.be(6)
            //expect(gns.score).to.be(6)
        });

        it("should pick card 12 in boardIndex 1",() => {
            var board = [
                null,                      null,                      new game.PlayerCard(1, 1),
                null,                      new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
                new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
            ]
            var player1 = new game.Player([1, 9, 12, null, null], [])
            var player2 = new game.Player([1, null, null, null, null], [])
            var gameNode = new game.Game(
                board,
                [player1, player2],
                8,
                0,
                game.RuleSetFlags.None
                )

            var gns = negamax(gameNode, { depth: 10, color: 1 })
            var move = gns.node.originalNode.move;
            var value = gns.node.value()
            var playerValue = gns.node.originalNode.playerValue(0)

            var altgns = negamax(gameNode, { depth: 1, color: 1 })
            var altmove = altgns.node.originalNode.move;
            var altvalue = altgns.node.value()
            var altplayerValue = altgns.node.originalNode.playerValue(0)

            //expect(move.boardIndex).to.be(1)
            //expect(move.handIndex).to.be(2)
            //expect(move.player).to.be(0)
            //expect(move.card.number).to.be(12)
            //expect(value).to.be(4)
            //expect(gns.score).to.be(6)

            var gns2 = negamax(gns.node, { depth: 10, color: 1 })
            var move2 = gns2.node.originalNode.move
            var value2 = gns2.node.value()
            var playerValue = gns2.node.originalNode.playerValue(0)

            var gns3 = negamax(gns2.node, { depth: 10, color: 1 })
            var move3 = gns3.node.originalNode.move
            var value3 = gns3.node.value()
            var playerValue = gns3.node.originalNode.playerValue(0)

            var x = 1
        });
    })

});
