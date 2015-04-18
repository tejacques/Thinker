import React = require('react')
import Board = require('./Components/Board')
import testVars = require('../test/TestVars')

var appRoot = document.getElementById('appRoot')

var game = testVars.TestGame[6]

var board = React.createElement(Board, { key: 'board', game: game })
var root = React.DOM.div({}, board)

React.render(root, appRoot) 