import expect = require('expect.js');

import game = require('../lib/Game')
import negamax = require('../lib/negamax')

describe("Negamax", () => {

    var board = [
        null,                      new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 0), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
    ]
    var player1 = new game.Player([1,       9, null, null, null], [])
    var player2 = new game.Player([null, null, null, null, null], [])
    var gameNode = new game.Game(
        board,
        [player1, player2],
        8,
        0,
        game.RuleSetFlags.None
    )
        
    describe("Game", function () {
        it("should pick 0,0 to win", () => {
            var gns = negamax(gameNode, { depth: 1, color: 1 })
            var move = gns.node.originalNode.move;

            expect(move.boardIndex).to.be(0)
            expect(move.handIndex).to.be(0)
            expect(move.player).to.be(0)
            expect(move.card.number).to.be(9)
        });
    })

});
