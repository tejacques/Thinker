import Game = require('../lib/Game')
import GamePlayers = require('../lib/GamePlayer')
import PlayGame = require('../lib/PlayGame')
import NegaMax = require('../lib/NegaMax')
import PrintBoard = require('../lib/PrintBoard')

var starterDeck = [1, 3, 5, 7, 10]
var player1 = new Game.Player(starterDeck, starterDeck)
var gamePlayer = GamePlayers[0]
var player2 = new Game.Player(gamePlayer.deck, gamePlayer.deck)
var rules = gamePlayer.rules
var firstMove = true
var player1DeckKnown = true
var player2DeckKnown = true

var nodes = PlayGame(
    starterDeck,
    starterDeck,
    gamePlayer.deck,
    gamePlayer.deck,
    firstMove,
    rules,
    player1DeckKnown,
    player2DeckKnown,
    NegaMax,
    NegaMax,
    5000,
    5000)