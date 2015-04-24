import React = require('react')
import Card = require('./Card')
import Picker = require('./Picker')
import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import Range = require('../../lib/Range')

interface CardPickerProps {
    onPicked: (card: GameCard.Card) => void
    style: React.CSSProperties
    cards: number[]
    onClick?: React.MouseEventHandler
}

interface CardPickerState {
}

import PlayerCard = Game.PlayerCard
var cardList = GameCard.cardList
var allCards: React.ReactElement<{ playerCard: PlayerCard }>[] = Range(0, 80).map(card => React.createElement(Card, { playerCard: new PlayerCard(card, null) }))

var sideMap = {
    't': 0,
    'r': 1,
    'b': 2,
    'l': 3,
}

class CardPicker extends React.Component<CardPickerProps, CardPickerState> {
    state = {
        cards: this.props.cards.map(i => allCards[i]),
    }
    handleChange(event) {
        var input = event.target.value.toLowerCase()
        var inputLen = input.length
        // TODO: Allow the syntax:
        // side comparison value:
        //  t=4
        //  b>3
        //  l<=6
        //  r=3 
        //
        // property comparison value:
        //  type=beast
        //  rarity=1
        //var sideFilters = input.split(' ')
        var filteredCards = this.props.cards.filter(cardId => {
            var card = cardList[cardId]

            // Check if name matches
            var name = card.name.substr(0, inputLen).toLowerCase() === input
            if (name) return true

            // Check if sides match
            var sides = card.sides
                .map(s => s.toString(16))

            // With spaces
            var sidesSpaces = sides
                .join(' ')
                .substr(0, inputLen) === input

            if (sidesSpaces) return true

            // Without spaces
            var sidesNoSpaces = sides
                .join('')
                .substr(0, inputLen) === input

            if (sidesNoSpaces) return true

            return false
        })

        this.setState({
            cards: filteredCards.map(cardId => allCards[cardId])
        })
    }
    render() {
        return React.DOM.div({
            style: {
                position: 'relative',
                background: 'rgba(60,60,60,0.8)',
                minHeight: '100vh',
            },
            onClick: this.props.onClick,
        },
            React.DOM.div({
                style: {
                    position: 'relative',
                    width: 832,
                    margin: 'auto',
                    padding: '100px 0px',
                    overflow: 'auto',
                },
            }, [
                React.DOM.input({
                    key: 'input',
                    style: {
                        margin: '30px auto',
                        display: 'block',
                        paddingLeft: 5,
                    },
                    placeholder: 'Sides',
                    onChange: (e) => this.handleChange(e),
                    onClick: (e) => e.stopPropagation(),
                    onKeyDown: (e) => {
                        if (e.keyCode == 13) {
                            this.props.onPicked(cardList[this.state.cards[0].props.playerCard.card])
                        }
                    }
                }),
                React.createElement(Picker, {
                    key: 'picker',
                    choices: this.state.cards,
                    onPicked: (component: React.ReactElement<{ playerCard: PlayerCard }>) => {
                        this.props.onPicked(cardList[component.props.playerCard.card])
                    },
                    style: {
                        listStyleType: 'none',
                    },
                    stopPropagation: true,
                })
            ])
        )
    }
}

export = CardPicker