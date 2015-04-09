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

//var allPlayer0Cards = cardList.map(card => new Game.PlayerCard(card.number, 0))
//var allPlayer1Cards = cardList.map(card => new Game.PlayerCard(card.number, 1))

//var cards = React.DOM.div(null, [
//    React.DOM.div(null, allPlayer0Cards.map(playerCard => React.createElement(Card, { playerCard: playerCard, key: playerCard.card }))),
//    React.DOM.div(null, allPlayer1Cards.map(playerCard => React.createElement(Card, { playerCard: playerCard, key: playerCard.card })))
//])

//new Game.Game(
//    TestBoard[5],
//    [TestPlayer1[4], TestPlayer2[4]],
//    2,
//    0,
//    Game.RuleSetFlags.None
//    )

var game = testVars.TestGame[6]

var board = React.createElement(Board, { game: game })
var cards: React.ReactElement<any>[] = cardList.map(card => React.createElement(Card, { playerCard: new PlayerCard(card.number, null) }))
var cardPicker = React.createElement<{}>(
    CardPicker, { style: { width: '100%',  }, choices: cards, onPicked: (picked) => { console.log("Picked", picked) } })
var root = React.DOM.div({}, [board])

React.render(root, appRoot)