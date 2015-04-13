import React = require('react')
import Card = require('./Components/Card')
import Board = require('./Components/Board')
import CardPicker = require('./Components/CardPicker')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
import testVars = require('../test/TestVars')

var appRoot = document.getElementById('appRoot')

var game = testVars.TestGame[6]

var board = React.createElement(Board, { key: 'board', game: game })
var cardPicker = React.createElement<{}>(
    CardPicker, { key: 'cardPicker', onPicked: (picked) => { console.log("Picked", picked) } })
var root = React.DOM.div({}, [board])

React.render(root, appRoot) 