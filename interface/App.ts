import React = require('react')
import Card = require('./components/card')
import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
var cardList = GameCard.cardList

var appRoot = document.getElementById('appRoot')
var playercardBlue = new Game.PlayerCard(5, 0)
var playercardRed = new Game.PlayerCard(8, 1)

var cards = React.DOM.span(null, [
    React.createElement(Card, playercardBlue),
    React.createElement(Card, playercardRed)
])

React.render(cards, appRoot)