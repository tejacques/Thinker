import expect = require('expect.js')
import Game = require('../lib/Game')
import GamePlayers = require('../lib/GamePlayers')
import PlayGame = require('../lib/PlayGame')
import NegaMax = require('../lib/NegaMax')
import PrintBoard = require('../lib/PrintBoard')

describe("Play Game",function() {
    this.timeout(0)
    describe('Starter Deck',() => {
        var starterDeck = [1, 3, 5, 7, 10]
        it("should win against Game Player 0 when playing first",() => {
            var player1 = new Game.Player(starterDeck, starterDeck)
            var gamePlayer = GamePlayers[0]
            var player2 = new Game.Player(gamePlayer.deck, gamePlayer.deck)
            var rules = 0
            gamePlayer.rules.forEach(rule => rules+=rule)
            var firstMove = true
            var player1DeckKnown = true
            var player2DeckKnown = true

            var nodes = PlayGame(player1, player2, firstMove, rules, player1DeckKnown, player2DeckKnown, NegaMax, NegaMax, 100, 60000)
            var p1node = nodes[0]
            var p2node = nodes[1]
        })
        it("should lose against Game Player 0 when playing second",() => {
            var player1 = new Game.Player(starterDeck, starterDeck)
            var gamePlayer = GamePlayers[0]
            var player2 = new Game.Player(gamePlayer.deck, gamePlayer.deck)
            var rules = 0
            gamePlayer.rules.forEach(rule => rules += rule)
            var firstMove = false
            var player1DeckKnown = true
            var player2DeckKnown = true

            var nodes = PlayGame(player1, player2, firstMove, rules, player1DeckKnown, player2DeckKnown, NegaMax, NegaMax, 60000, 100)
            var p1node = nodes[0]
            var p2node = nodes[1]
        })
    })
})
