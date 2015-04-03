import React = require('react')
import Card = require('./components/card')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
var cardList = GameCard.cardList

var appRoot = document.getElementById('appRoot')
var playercardBlue = new Game.PlayerCard(5, 0)
var playercardRed = new Game.PlayerCard(8, 1)

var allPlayer0Cards = cardList.map(card => new Game.PlayerCard(card.number, 0))
var allPlayer1Cards = cardList.map(card => new Game.PlayerCard(card.number, 1))

var cards = React.DOM.div(null, [
    React.DOM.div(null, allPlayer0Cards.map(playerCard => React.createElement(Card, { playerCard: playerCard, key: playerCard.card }))),
    React.DOM.div(null, allPlayer1Cards.map(playerCard => React.createElement(Card, { playerCard: playerCard, key: playerCard.card })))
])

React.render(cards, appRoot)