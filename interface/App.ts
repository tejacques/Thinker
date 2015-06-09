import React = require('react')
import Board = require('./Components/Board')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
import ArrayUtils = require('../lib/ArrayUtils')
import Range = require('../lib/Range')
import IterativeDeepening = require('../lib/IterativeDeepening')
import NegaMax = require('../lib/NegaMax')

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

var board = React.createElement(Board, { key: 'board', game: game })
function getNextMove(time) {
    var game = <Game.Game>window['board'].state.game
    var color = game.getPlayerId() === 0 ? 1 : -1
    var node = game.clone()
    var next = IterativeDeepening(
        node,
        NegaMax,
        9,
        color,
        time,
        null,
        depthReached => node.turn + depthReached >= 9)

    return next.node.originalNode.move
}

window['board'] = React.render(board, appRoot)
window['getNextMove'] = getNextMove