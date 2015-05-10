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
//var badGame = { "_value": -10, "board": [{ "card": 62, "player": 1 }, { "card": 3, "player": 1 }, null, null, { "card": 7, "player": 1 }, { "card": 45, "player": 1 }, null, { "card": 50, "player": 1 }, { "card": 1, "player": 1 }], "players": [{ "hand": [null, null, 6, null, 10], "rarityRestriction": 4, "deck": [2, 4, 5, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80] }, { "hand": [0, null, null, null, 0], "rarityRestriction": 0, "deck": [39, 41, 49, 61] }], "turn": 6, "firstMove": 0, "rules": 8, "originalNode": null, "parent": null }
//var badGame = { "_value": -198.33333333333334, "board": [null, { "card": 56, "player": 1 }, null, null, { "card": 1, "player": 1 }, { "card": 3, "player": 1 }, null, null, { "card": 55, "player": 1 }], "players": [{ "hand": [31, null, null, 63, 65], "rarityRestriction": 4, "deck": [2, 4, 5, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], "numFaceDownCards": 5 }, { "hand": [null, null, 6, 7, 10], "rarityRestriction": 0, "deck": [66], "numFaceDownCards": 5 }], "turn": 4, "firstMove": 0, "rules": 6144, "originalNode": null, "parent": null, "bonus": [0, 0, 0, 0, 0] }
//var badGame = { "_value": 0, "board": [null, null, null, null, null, null, null, null, null], "players": [{ "hand": [31, 55, 56, 63, 65], "rarityRestriction": 0, "deck": [66], "numFaceDownCards": 5 }, { "hand": [1, 3, 6, 7, 10], "rarityRestriction": 4, "deck": [2, 4, 5, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], "numFaceDownCards": 5 }], "turn": 0, "firstMove": 0, "rules": 6144, "originalNode": null, "parent": null, "bonus": [0, 0, 0, 0, 0] }
//game.board = <Game.PlayerCard[]>badGame.board.map(card => card && new Game.PlayerCard(card.card, card.player) || null)
//game.players = <Game.Player[]>badGame.players.map(player => new Game.Player(player.hand, player.deck, player.rarityRestriction))
//game.turn = badGame.turn
//game.firstMove = badGame.firstMove
//game.rules = badGame.rules
//game.bonus = badGame.bonus

var board = React.createElement(Board, { key: 'board', game: game })
var root = React.DOM.div({}, board)

React.render(root, appRoot)