import React = require('react')
import ReactUtils = require('../ReactUtils')
import BoardTimer = require('./BoardTimer')
import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import GamePlayer = require('../../lib/GamePlayer')
import ArrayUtils = require('../../lib/ArrayUtils')
import Card = require('./Card')
import CardPicker = require('./CardPicker')
import Config = require('../Config')
import Utils = require('../Utils')
import IterativeDeepening = require('../../lib/IterativeDeepening')
import NegaMax = require('../../lib/NegaMax')
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



interface HandItemProps {
    game: Game.Game
    index: number
    player: number
    style: React.CSSProperties
    started: boolean
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
                        var able = component.props.started
                            && !component.props.game.isTerminal()
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
        dragProps.onClick = this.props.onClick
        return React.DOM.span(dragProps,
            React.createElement(HandItem, this.props))
    }
})

interface BoardItemProps {
    board: Board
    game: Game.Game
    preview: Game.Game
    style: React.CSSProperties
    index: number
}

function getNext(
    component: React.Component<BoardItemProps, any>,
    item: { component: React.Component<HandItemProps, any> }) {
    var game = component.props.board.state.game
    var boardIndex = component.props.index
    var handIndex = item.component.props.index
    return game.playCard(handIndex, 0, boardIndex)
}

var DroppableBoardItem = React.createClass<BoardItemProps, {}>({
    mixins: [DragDropMixin],
    statics: {
        configureDragDrop(register) {
            register('HandItem', {
                dropTarget: {
                    acceptDrop(
                        component: React.Component<BoardItemProps, any>,
                        item: { component: React.Component<HandItemProps, any> }) {
                        
                        component.props.board.setState({
                            game: getNext(component, item),
                            preview: null,
                        })
                    },

                    canDrop(component: React.Component<BoardItemProps, any>) {
                        var game = component.props.game
                        var index = component.props.index
                        var droppable = !game.board[index]

                        return !game.board[index]
                    },
                    enter(
                        component: React.Component<BoardItemProps, any>,
                        item: { component: React.Component<HandItemProps, any> }) {

                        // This is dumb, but it must be in
                        // a setTimeout to happen after leave
                        setTimeout(() => {
                            // Preview the move
                            component.props.board.setState({
                                preview: getNext(component, item),
                            })
                        }, 0)
                    },
                    leave(
                        component: React.Component<BoardItemProps, any>,
                        item: { component: React.Component<HandItemProps, any> }) {

                        component.props.board.setState({
                            preview: null,
                        })
                    }
                }
            })
        }
    },
    render() {
        var style = this.props.style
        var index: number = this.props.index
        var game: Game.Game = this.props.game
        var preview: Game.Game = this.props.preview
        var playerCard = game.board[index]
        var dropState = this.getDropState('HandItem')

        var previewColor = null
        if (preview && preview.move && preview.move.captures) {
            var captures = preview.move.captures
            for (var key in captures) {
                if (captures.hasOwnProperty(key)) {
                    var captured = captures[key]
                    var exists = false
                    var captureLevelLen = captured.length
                    for (var captureLevelIndex = 0;
                        captureLevelIndex < captureLevelLen;
                        captureLevelIndex++) {
                        var captureLevel = captured[captureLevelIndex]
                        if (captureLevel.indexOf(index) != -1) {
                            exists = true
                            break
                        }
                    }

                    if (!exists) {
                        continue
                    }

                    if (key === String(Game.RuleSetFlags.Plu)) {
                        previewColor = 'orange'
                        break
                    } else if (key === String(Game.RuleSetFlags.Sam)) {
                        previewColor = 'rgba(255, 255, 0, 0.3)'
                        break
                    } else if (key === String(Game.RuleSetFlags.Com)) {
                        previewColor = 'rgba(255, 0, 0, 0.3)'
                        break
                    } else {
                        previewColor = 'rgba(0, 255, 0, 0.3)'
                    }
                }
            }
        }

        if (dropState.isHovering) {
            style.backgroundColor = 'rgba(0, 255, 0, 0.3)'
        } else if (previewColor) {
            style.backgroundColor = previewColor
        } else if (dropState.isDragging) {
            style.backgroundColor = 'rgba(0, 0, 255, 0.3)'
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

interface BoardProps {
    game: Game.Game
}

interface BoardState {
    game?: Game.Game
    started?: boolean
    picker?: {
        open: boolean
        cards?: number[]
    }
    preview?: Game.Game
}

class Board extends React.Component<BoardProps, BoardState> {
    state = {
        game: this.props.game,
        started: false,
        picker: {
            open: false,
            cards: [],
        },
        preview: null
    }
    pickerClick(card: GameCard.Card) {
    }
    openPicker(index: number, player: number) {
        this.pickerClick = card => {
            var node = this.state.game.clone();
            var gamePlayer = node.players[player]
            var deck = gamePlayer.deck
            var hand = node.players[player].hand
            var handId = hand[index]
            hand[index] = card.number
            deck.push(handId)
            ArrayUtils.numericSort(deck, x => x)
            node.players[player].deck = Game.legalDeckFilter(hand, deck, node.players[player].rarityRestriction)
            this.setState({
                game: node,
                picker: {
                    open: false
                },
            })
        }
        var cards = this.state.game.players[player].deck
        this.setState({
            picker: {
                open: true,
                cards: cards,
            }
        })
    }
    render() {
        var game = this.state.game
        var preview = this.state.preview
        var boardElements: React.ReactElement<any>[] = []

        // Board Image
        boardElements.push(React.DOM.img({ src: boardImageSrc, style: boardImgStyle, key: 'boardBg' }))

        var playerId = game.getPlayerId()
        // Player Cards:
        // Players Cards for the player whose turn it is
        // are draggable onto the board in an open position
        playerStyles.forEach((playerStyles, player) =>
            playerStyles.forEach((style, index) => boardElements.push(
                React.createElement<HandItemProps>(DraggableHandItem, {
                    started: this.state.started,
                    game: game,
                    index: index,
                    player: player,
                    style: style,
                    key: 'player' + (player + 1) + '_card' + (index + 1),
                    onClick: () => {
                        if (this.state.game.players[player].deck.length > 0) {
                            this.openPicker(index, player)
                        }
                    },
                })
            ))
        )


        // Board Cards
        bStyles.forEach((style, index) =>
            boardElements.push(
                React.createElement<BoardItemProps>(DroppableBoardItem, {
                    board: this,
                    game: game,
                    preview: preview,
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
            boardElements.push(React.createElement(
                BoardTimer, {
                    active: timersActive && playersTurn,
                    style: style,
                    key: 'timer_' + player,
                }
            ))
        })

        // Rules
        var ruleSetList = Game.RuleSetFlagsToStrings(this.state.game.rules)

        var rules = React.DOM.span({
            key: 'rules',
            style: {
                position: 'absolute',
                top: 60,
                left: 836,
                width: 256,
                height: 70,
                background: 'rgba(60,60,60,0.8)',
                padding: 10,
                boxSizing: 'border-box',
                color: 'white',
            },
        }, ruleSetList.map((rule, index) => React.DOM.div({
            key: 'rule_' + index
        }, rule)))
        boardElements.push(rules)

        // Player Select (dropdown)
        game.players.forEach((p, playerId) => {
            var playerList = React.DOM.select({
                key: 'playerList_' + playerId,
                style: {
                    display: 'block',
                    position: 'absolute',
                    top: 185,
                    left: 80 + playerId * 770,
                },
                onChange: e => {
                    var value = e.target['value']
                    var node = this.state.game.clone()
                    var deck: number[]
                    var hand: number[] = ArrayUtils.fillArray(0, 5)
                    if (value === 'All') {
                        deck = Game.cardIds
                        node.players[playerId].rarityRestriction = 4
                    } else if (value === 'Starter Deck') {
                        hand = [1, 3, 6, 7, 10]
                        deck = Game.cardIds
                        node.players[playerId].rarityRestriction = 4
                    } else {
                        var player: GamePlayer.GamePlayer = GamePlayer.players[parseInt(value)]
                        if (player.hand) {
                            hand = player.hand
                        }
                        deck = player.deck
                        node.players[playerId].rarityRestriction = 0
                        if (playerId === 1) {
                            // Set the rules
                            node.rules = player.rules
                        }
                    }
                    node.players[playerId].deck = deck
                    node.players[playerId].hand = hand
                    this.setState({
                        game: node
                    })
                }
            }, [
                React.DOM.option({
                    value: 'All',
                    key: 'All',
                }, 'Player'),
                React.DOM.option({
                    value: 'Starter Deck',
                    key: 'Starter Deck',
                }, 'Starter Deck')
            ].concat(GamePlayer.players.map((player, index) => React.DOM.option({
                value: String(index),
                key: player.name,
            }, player.name))))

            boardElements.push(playerList)
        })

        // Start Button
        if (!this.state.started) {
            var startButton = React.DOM.button({
                key: 'start_button',
                style: {
                    display: 'block',
                    position: 'absolute',
                    top: 560,
                    left: 440,
                    width: 80,
                    height: 40,
                },
                onClick: () => this.setState({ started: true })
            }, 'Start')
            boardElements.push(startButton)

            // Toggle First
            var toggleFirstButtom = React.DOM.button({
                key: 'blue_first_button',
                style: {
                    display: 'block',
                    position: 'absolute',
                    top: 560,
                    left: 530,
                    width: 80,
                    height: 40,
                },
                onClick: () => {
                    var node = game.clone()
                    node.firstMove = (node.firstMove + 1) % node.players.length
                    this.setState({
                        game: node
                    })
                }
            }, (game.firstMove === 0 ? 'Blue' : 'Red') + ' First')
            boardElements.push(toggleFirstButtom)
            
        } else {

            // Restart Button
            var restartButton = React.DOM.button({
                key: 'restart_button',
                style: {
                    display: 'block',
                    position: 'absolute',
                    top: 560,
                    left: 440,
                    width: 80,
                    height: 40,
                },
                onClick: () => {
                    var node: Game.Game = this.state.game
                    while (node.parent) {
                        node = node.parent
                    }
                    node = node.clone()
                    var player = node.players[1]
                    player.hand.forEach((cardId, index) => {
                        player.hand[index] = 0
                        player.deck.push(cardId)
                    })
                    player.deck = Game.legalDeckFilter(
                        player.hand,
                        player.deck,
                        player.rarityRestriction)

                    ArrayUtils.numericSort(player.deck, x => x)
                    this.setState({
                        game: node,
                        started: false,
                    })
                }
            }, 'Restart')
            boardElements.push(restartButton)

            // AI Play button
            var aiPlayButton = React.DOM.button({
                key: 'play_button',
                style: {
                    display: 'block',
                    position: 'absolute',
                    top: 560,
                    left: 530,
                    width: 80,
                    height: 40,
                },
                onClick: () => {
                    var color = game.getPlayerId() === 0 ? 1 : -1
                    var time = 10000
                    var node = this.state.game.clone()
                    var next = IterativeDeepening(
                        this.state.game,
                        NegaMax,
                        9,
                        color,
                        time,
                        null,
                        depthReached => node.turn + depthReached >= 9)
                    this.setState({
                        game: next.node.originalNode
                    })
                }
            }, 'AI Play')
            boardElements.push(aiPlayButton)

            // Undo Button
            if (this.state.game.parent) {
                var restartButton = React.DOM.button({
                    key: 'undo_button',
                    style: {
                        display: 'block',
                        position: 'absolute',
                        top: 560,
                        left: 620,
                        width: 80,
                        height: 40,
                    },
                    onClick: () => {
                        var node: Game.Game = this.state.game
                        if (node.parent) {
                            node = node.parent
                            this.setState({
                                game: node,
                                started: true,
                            })
                        }
                    }
                }, 'Undo')

                boardElements.push(restartButton)
            }
        }

        // Picker
        if (this.state.picker.open) {
            var cardPicker = React.createElement<{}>(CardPicker, {
                key: 'cardPicker',
                cards: this.state.picker.cards,
                onPicked: (picked) => this.pickerClick(picked),
                onClick: () => {
                    this.setState({ picker: { open: false } })
                },
            })
            boardElements.push(cardPicker)
        }

        return React.DOM.span({ style: boardStyle }, boardElements)
    }
}

export = Board