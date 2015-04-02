import React = require('react')
import Card = require('./components/card')
import GameCard = require('../lib/GameCard')
var cardList = GameCard.cardList

var appRoot = document.getElementById('appRoot')
var card = cardList[5]
React.render(React.createElement(Card, card), appRoot)