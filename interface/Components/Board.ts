import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import Card = require('./Card')
import React = require('react')
import ReactUtils = require('../ReactUtils')
import Utils = require('../Utils')
import Config = require('../Config')
var ReactDND = require('react-dnd')
var DragDropMixin = ReactDND.DragDropMixin

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
                height: colOffset,
                width: rowOffset,
                paddingTop: 4,
                paddingLeft: 16,
                boxSizing: 'border-box',
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

var bStyles = boardStyles(369, 73)
var pStyles = pointStyles(35, 62)

interface BoardProps {
    game: Game.Game
}

interface BoardState {
    game: Game.Game
    started?: boolean
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
    componentWillReceiveProps(nextProps) {
        this.setState({
            time: 60000,
            remaining: nextProps.active ? 60000 : 0,
            startTime: (+new Date())
        })
    }
    render() {
        if (this.props.active && this.state.remaining > 0) {
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
    interval: any
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 33)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    tick() {
        if (this.props.active && this.state.remaining > 0) {
            var elapsed = (+new Date()) - this.state.startTime
            this.setState({
                time: this.state.time,
                remaining: this.state.time - elapsed,
                startTime: this.state.startTime,
            })
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

                    beginDrag(component: React.Component<HandItemProps, any>) {
                        return {
                            item: {
                                component: component
                            }
                        };
                    },

                    canDrag(component: React.Component<HandItemProps, any>) {
                        var able = !component.props.game.isTerminal()
                            && component.props.game.getPlayerId() === component.props.player
                        return able
                    }
                }
            });
        },
    },
    render() {
        // {...this.dragSourceFor(ItemTypes.IMAGE)} will expand into
        // { draggable: true, onDragStart: (handled by mixin), onDragEnd: (handled by mixin) }.
        var dragState = this.getDragState('HandItem')

        if (dragState.isDragging) {
            return null
        }

        var dragProps = this.dragSourceFor('HandItem')
        return React.DOM.span(dragProps,
            React.createElement(HandItem, this.props))
    }
})

interface BoardItemProps {
    board: Board
    game: Game.Game
    style: React.CSSProperties
    index: number
}

var DroppableBoardItem = React.createClass<BoardItemProps, {}>({
    mixins: [DragDropMixin],
    statics: {
        configureDragDrop(register) {
            register('HandItem', {
                dropTarget: {
                    acceptDrop(component: React.Component<BoardItemProps, any>, item: { component: React.Component<HandItemProps, any> }) {
                        var game = component.props.board.state.game
                        var boardIndex = component.props.index
                        var handIndex = item.component.props.index
                        game = game.playCard(handIndex, 0, boardIndex)
                        component.props.board.setState({
                            game: game
                        })
                    },

                    canDrop(component: React.Component<BoardItemProps, any>) {
                        var game = component.props.game
                        var index = component.props.index
                        var droppable = !game.board[index]

                        return !game.board[index]
                    },
                    enter(component, item) {
                        // TODO: Preview the move
                    }
                }
            })
        }
    },
    render() {
        var style = this.props.style
        var index = this.props.index
        var game = this.props.game
        var playerCard = game.board[index]
        var dropState = this.getDropState('HandItem')

        if (dropState.isHovering) {
            style.backgroundColor = 'green'
            style.opacity = 0.3
        } else if (dropState.isDragging) {
            style.backgroundColor = 'blue'
            style.opacity = 0.3
        } else {
            style.backgroundColor = undefined
            style.opacity = undefined
        }

        var props = this.dropTargetFor('HandItem')
        props.style = style

        return React.DOM.span(props,
            React.createElement(BoardItem, this.props))
    }
})

class BoardItem extends React.Component<BoardItemProps, void> {
    render() {
        var game = this.props.game
        var index = this.props.index
        return React.createElement(Card, {
            playerCard: game.board[index]
        })
    }
}

class Board extends React.Component<BoardProps, BoardState> {
    state = {
        game: this.props.game,
        started: true,
    }
    render() {
        console.log(this)
        var game = this.state.game
        var boardElements: React.ReactElement<any>[] = []

        // Board Image
        boardElements.push(React.DOM.img({ src: boardImageSrc, style: boardImgStyle, key: 'boardBg' }))

        var playerId = game.getPlayerId()
        console.log('Player: ' + playerId)
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
                    key: 'player' + (player + 1) + '_card' + (index + 1)
                })
            ))
        )


        // Board Cards
        bStyles.forEach((style, index) =>
            boardElements.push(
                React.createElement<BoardItemProps>(DroppableBoardItem, {
                    board: this,
                    game: game,
                    index: index,
                    style: style,
                    key: 'board_row' + ((index / 3) | 0) + '_col' + (index % 3)
                })
            )
        )

        // Points
        var bluePoints = game.playerValue(0)
        pStyles.forEach((style, index) => {
            boardElements.push(React.DOM.img({
                style: style,
                key: 'point_' + index,
                src: pointImageSrcPrefix + (index < bluePoints ? 0 : 1) + Config.imageExtension
            }))
        })

        // Timers
        var timersActive = this.state.started && !this.state.game.isTerminal()
        tStyles.forEach((style, player) => {
            var playersTurn = player === playerId
            console.log('player: ' + player, ' playerId: ' + playerId + ', player === playerId ' + playersTurn)
            boardElements.push(React.createElement(
                BoardTimer,
                {
                    active: timersActive && playersTurn,
                    style: style,
                    key: 'timer_' + player,
                }
            ))
        })

        return React.DOM.span({ style: boardStyle }, boardElements)
    }
}

export = Board