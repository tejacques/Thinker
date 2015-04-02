import React = require('react')
import Card = require('./components/card')
import GameCard = require('../lib/GameCard')
var cardList = GameCard.cardList

var root = document.createElement('div')
document.body.appendChild(root)

var card = cardList[5]
React.render(React.createElement(Card, card), root)