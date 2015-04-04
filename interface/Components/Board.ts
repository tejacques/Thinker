import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import Card = require('./Card')
import React = require('react')
import ReactUtils = require('../ReactUtils')
import Config = require('../Config')

var boardImageSrc = Config.imageBase + 'board' + Config.imageExtension

var boardStyle = ReactUtils.CSS({
    position: 'relative',
    width: 1145,
    height: 552,
})

var boardImgStyle = ReactUtils.CSS({
    position: 'absolute',
})

function handStyles(xOffset: number, yOffset: number) {
    var styles: React.CSSProperties[] = []
    var colOffset = 108
    var rowOffset = 137
    var bottomRowOffset = 54

    // Top Row
    for (var i = 0; i < 3; i++) {
        styles.push(ReactUtils.CSS({
            position: 'absolute',
            left: xOffset + colOffset * i,
            top: yOffset,
        }))
    }

    // Bottom Row
    for (var i = 0; i < 2; i++) {
        styles.push(ReactUtils.CSS({
            position: 'absolute',
            left: xOffset + bottomRowOffset + colOffset * i,
            top: yOffset + rowOffset,
        }))
    }

    return styles
}

function boardStyles(xOffset: number, yOffset: number) {
    var styles: React.CSSProperties[] = []
    var colOffset = 135
    var rowOffset = 135

    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            styles.push(ReactUtils.CSS({
                position: 'absolute',
                top: yOffset + rowOffset * row,
                left: xOffset + colOffset * col,
            }))
        }
    }

    return styles
}

var player1HandStyles = handStyles(26, 214)
var player2HandStyles = handStyles(798, 214)

var playerStyles = [player1HandStyles, player2HandStyles]

var bStyles = boardStyles(385, 77)

interface BoardProps {
    game: Game.Game
}

class Board extends React.Component<BoardProps, void> {
    render() {
        var game = this.props.game
        var boardElements: React.ReactElement<any>[] = []

        // Board Image
        boardElements.push(React.DOM.img({ src: boardImageSrc, style: boardImgStyle }))

        // Player Cards
        playerStyles.forEach((playerStyles, player) =>
            playerStyles.forEach((style, index) => boardElements.push(
                React.DOM.span({ style: style, key: 'player'+(player+1)+'_card' +(index+1) },
                    React.createElement(Card, {
                        playerCard: new Game.PlayerCard(
                            game.players[player].hand[index],
                            player)
                    })
                )
            ))
        )

        // Board Cards
        bStyles.forEach((style, index) =>
            boardElements.push(React.DOM.span({ style: style, key: 'board_row' + ((index/3) | 0) + '_col' + (index%3) }, React.createElement(Card, {
                playerCard: game.board[index]
            })))
        )

        return React.DOM.span({ style: boardStyle }, boardElements)
    }
}

export = Board