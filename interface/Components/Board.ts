import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import Card = require('./Card')
import React = require('react')
import ReactUtils = require('../ReactUtils')
import Utils = require('../Utils')
import Config = require('../Config')
var DragDropMixin = require('react-dnd')

var boardImageSrc = Config.imageBase + 'board' + Config.imageExtension
var pointImageSrcPrefix = Config.imageBase + 'point/'

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

function pointStyles(xOffset: number, yOffset: number) {
    var styles: React.CSSProperties[] = []
    var colOffset = 26
    var rowOffset = 27
    var bottomRowOffset = 3 * colOffset - 6

    for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 5; col++) {
            styles.push(ReactUtils.CSS({
                position: 'absolute',
                top: yOffset + rowOffset * row,
                left: xOffset + colOffset * col
                    + bottomRowOffset
                    + row * bottomRowOffset,
            }))
        }
    }

    return styles
}

var player1HandStyles = handStyles(26, 214)
var player2HandStyles = handStyles(798, 214)

var playerStyles = [player1HandStyles, player2HandStyles]

var bStyles = boardStyles(385, 77)
var pStyles = pointStyles(35, 62)

interface BoardProps {
    game: Game.Game
}

interface BoardState {
    game: Game.Game
    started: boolean
}

function timerStyles(xOffset: number, yOffset: number) {
    var styles: React.CSSProperties[] = []
    var playerOffset = 526

    for (var player = 0; player < 2; player++) {
        styles.push(ReactUtils.CSS({
            fontFamily: 'Courier New',
            fontSize: 17,
            //height: 15,
            width: 55,
            //color: '#C2C2A8',
            color: '#A8A884',
            textShadow: '1px 1px black',
            position: 'absolute',
            top: yOffset,
            left: xOffset + playerOffset * player,
        }))
    }

    return styles
}

var tStyles = timerStyles(284, 142)

class BoardTimer extends React.Component<
    { active: boolean; style: React.CSSProperties },
    { time: number; remaining: number; startTime: number }> {
    state = {
        time: 60000,
        remaining: this.props.active ? 60000 : 0,
        startTime: (+new Date())
    }
    render() {
        if (this.state.remaining > 0) {
            var seconds = Utils.pad(2, '0', Math.max((this.state.remaining / 1000) | 0, 0))
            var rest = Utils.pad(2, '0', Math.max(((this.state.remaining % 1000) / 10) | 0, 0))
            return React.DOM.span(
                { style: this.props.style },
                React.DOM.text(null, seconds + ':' + rest))
        } else {
            return React.DOM.span(
                { style: this.props.style },
                React.DOM.text(null, '--:--'))
        }
    }
    componentDidMount() {
        if (this.props.active) {
            this.tick()
        }
    }
    tick() {
        if (this.state.remaining > 0) {
            var elapsed = (+new Date()) - this.state.startTime
            this.setState({
                time: this.state.time,
                remaining: this.state.time - elapsed,
                startTime: this.state.startTime,
            })
            setTimeout(() => this.tick(), 33)
        }
    }
}

interface HandItemProps {
    game: Game.Game
    index: number
    player: number
    style: React.CSSProperties
}

class HandItem extends React.Component<HandItemProps, void> {
    render() {
        var game = this.props.game
        var index = this.props.index
        var player = this.props.player
        var style = this.props.style
        return React.DOM.span({
            style: style,
        },
            React.createElement(Card, {
                playerCard: new Game.PlayerCard(
                    game.players[player].hand[index],
                    player)
            })
        )
    }
}

var DraggableHandItem = React.createClass<HandItemProps, {}>({
    mixins: [DragDropMixin],
    statics: {
        configureDragDrop(register) {

            // Specify all supported types by calling register(type, { dragSource?, dropTarget? })

            register('HandItem', {

                // dragSource, when specified, is {
                //   beginDrag(component),
                //   canDrag(component)?,
                //   endDrag(component, dropEffect)?
                // }

                dragSource: {

                    // beginDrag should return {
                    //   item,
                    //   dragAnchors?,
                    //   dragPreview?,
                    //   dragEffect?
                    // }

                    beginDrag(component) {
                        return {
                            item: {
                                image: component.props.image
                            }
                        };
                    }
                }
            });
        },
    },
    render() {
        // {...this.dragSourceFor(ItemTypes.IMAGE)} will expand into
        // { draggable: true, onDragStart: (handled by mixin), onDragEnd: (handled by mixin) }.
        var dragProps = this.dragSourceFor('HandItem')
        dragProps.key = 'player' + (this.props.player + 1) + '_card' + (this.props.index + 1)
        return React.DOM.span(dragProps,
            React.createElement(HandItem, this.props))
    }
})

interface BoardItemProps {
}

var DroppableBoardItem = React.createClass<BoardItemProps, {}>({
    render: () => null
})

class BoardItem extends React.Component<BoardItemProps, void> {
}

class Board extends React.Component<BoardProps, BoardState> {
    state = {
        game: this.props.game,
        started: false,
    }
    render() {
        console.log(this)
        var game = this.state.game
        var boardElements: React.ReactElement<any>[] = []

        // Board Image
        boardElements.push(React.DOM.img({ src: boardImageSrc, style: boardImgStyle }))

        var playerId = game.getPlayerId()
        // Player Cards:
        // Players Cards for the player whose turn it is
        // are draggable onto the board in an open position
        playerStyles.forEach((playerStyles, player) =>
            playerStyles.forEach((style, index) => boardElements.push(
                React.createElement<HandItemProps>(DraggableHandItem, {
                    game: game,
                    index: index,
                    player: player,
                    style: style,
                })

                //React.DOM.span({ style: style, key: 'player'+(player+1)+'_card' +(index+1) },
                //    React.createElement(Card, {
                //        playerCard: new Game.PlayerCard(
                //            game.players[player].hand[index],
                //            player)
                //    })
                //)
            ))
        )


        // Board Cards
        bStyles.forEach((style, index) =>
            boardElements.push(React.DOM.span({ style: style, key: 'board_row' + ((index/3) | 0) + '_col' + (index%3) }, React.createElement(Card, {
                playerCard: game.board[index]
            })))
        )

        // Points
        var bluePoints = game.playerValue(0)
        pStyles.forEach((style, index) =>
            boardElements.push(React.DOM.img({
                style: style,
                key: 'point_' + index,
                src: pointImageSrcPrefix + (index < bluePoints ? 0 : 1) + Config.imageExtension
            }))
        )

        // Timers
        tStyles.forEach((style, player) =>
            boardElements.push(React.createElement(
                BoardTimer,
                {
                    active: player === playerId,
                    style: style,
                }
            ))
        )

        return React.DOM.span({ style: boardStyle }, boardElements)
    }
}

export = Board