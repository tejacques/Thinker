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
var allCards: React.ReactElement<any>[] = Range(0, 80).map(card => React.createElement(Card, { playerCard: new PlayerCard(card, null) }))

class CardPicker extends React.Component<CardPickerProps, CardPickerState> {
    state = {
        cards: this.props.cards.map(i => allCards[i]),
    }
    handleChange(event) {
        var input = event.target.value
        var inputLen = input.length
        var filteredCards = this.props.cards.filter(cardId =>
            cardList[cardId].sides.join(" ").substr(0, inputLen) === input)

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