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
        new Game.Player(ArrayUtils.fillArray(0, 5), Game.cardIds)
    ],
    0,
    0,
    Game.RuleSetFlags.None
    )

var board = React.createElement(Board, { key: 'board', game: game })
var root = React.DOM.div({}, board)

React.render(root, appRoot) 