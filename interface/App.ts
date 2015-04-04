import React = require('react')
import Card = require('./Components/Card')
import Board = require('./Components/Board')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
import testVars = require('../test/TestVars')

var cardList = GameCard.cardList

var appRoot = document.getElementById('appRoot')

//var allPlayer0Cards = cardList.map(card => new Game.PlayerCard(card.number, 0))
//var allPlayer1Cards = cardList.map(card => new Game.PlayerCard(card.number, 1))

//var cards = React.DOM.div(null, [
//    React.DOM.div(null, allPlayer0Cards.map(playerCard => React.createElement(Card, { playerCard: playerCard, key: playerCard.card }))),
//    React.DOM.div(null, allPlayer1Cards.map(playerCard => React.createElement(Card, { playerCard: playerCard, key: playerCard.card })))
//])


var board = React.createElement(Board, { game: testVars.TestGame[6] })

React.render(board, appRoot)