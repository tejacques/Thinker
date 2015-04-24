import React = require('react')
import Board = require('./Components/Board')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
import ArrayUtils = require('../lib/ArrayUtils')
import Range = require('../lib/Range')

var appRoot = document.getElementById('appRoot')

var game = new Game.Game(
    Game.newBoard(),
    [
        new Game.Player(ArrayUtils.fillArray(0, 5), Game.cardIds),
        new Game.Player(ArrayUtils.fillArray(0, 5), Game.cardIds, 0) // NPC Has no rarity restriction
    ],
    0,
    0,
    Game.RuleSetFlags.None
    )

//var badGame = { "_value": -10, "board": [{ "card": 9, "player": 1 }, { "card": 10, "player": 1 }, { "card": 22, "player": 0 }, { "card": 45, "player": 1 }, { "card": 39, "player": 1 }, { "card": 23, "player": 0 }, { "card": 49, "player": 1 }, null, { "card": 50, "player": 1 }], "players": [{ "hand": [null, null, null, 18, null], "rarityRestriction": 4, "deck": [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80] }, { "hand": [null, 41, null, null, null], "rarityRestriction": 0, "deck": [61, 62] }], "turn": 8, "firstMove": 0, "rules": 8, "originalNode": null, "parent": null }
//game.board = <Game.PlayerCard[]>badGame.board.map(card => card && new Game.PlayerCard(card.card, card.player) || null)
//game.players = <Game.Player[]>badGame.players.map(player => new Game.Player(player.hand, player.deck, player.rarityRestriction))
//game.turn = badGame.turn
//game.firstMove = badGame.firstMove
//game.rules = badGame.rules

var board = React.createElement(Board, { key: 'board', game: game })
var root = React.DOM.div({}, board)

React.render(root, appRoot) 