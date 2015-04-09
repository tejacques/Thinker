import React = require('react')
import Card = require('./Components/Card')
import Board = require('./Components/Board')
import CardPicker = require('./Components/CardPicker')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
import PlayerCard = Game.PlayerCard
import testVars = require('../test/TestVars')

var cardList = GameCard.cardList

var appRoot = document.getElementById('appRoot')

var game = testVars.TestGame[6]

var board = React.createElement(Board, { game: game })
var cards: React.ReactElement<any>[] = cardList.map(card => React.createElement(Card, { playerCard: new PlayerCard(card.number, null) }))
var cardPicker = React.createElement<{}>(
    CardPicker, { style: { width: '100%',  }, choices: cards, onPicked: (picked) => { console.log("Picked", picked) } })
var root = React.DOM.div({}, [board])

React.render(root, appRoot)