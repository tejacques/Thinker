import React = require('react')
import Card = require('./Card')
import Picker = require('./Picker')
import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import Range = require('../../lib/Range')

interface CardPickerProps {
    onPicked: (card: GameCard.Card) => void
    style: React.CSSProperties
}

interface CardPickerState {
    open: boolean
}

import PlayerCard = Game.PlayerCard
var cardList = GameCard.cardList
var allCards: React.ReactElement<any>[] = Range(1, 80).map(card => React.createElement(Card, { playerCard: new PlayerCard(card, null) }))

class CardPicker extends React.Component<CardPickerProps, CardPickerState> {
    state = {
        open: true,
        cards: allCards,
    }
    display(open) {
        this.setState({
            open: open
        })
    }
    show() {
        this.display(true)
    }
    hide() {
        this.display(false)
    }
    handleChange(event) {
        var input = event.target.value
    }
    render() {
        if (!this.state.open) {
            return null
        }

        return React.DOM.div({
            style: {
                position: 'relative',
                background: 'rgba(60,60,60,0.8)',
            }
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
                        onChange: (e) => this.handleChange(e)
                    }),
                    React.createElement(Picker, {
                    key: 'picker',
                    choices: this.state.cards,
                    onPicked: (component: React.ReactElement<{ playerCard: PlayerCard }>) => {
                        this.setState({ open: false })
                        this.props.onPicked(cardList[component.props.playerCard.card])
                    },
                    style: {
                        listStyleType: 'none',
                    },
                })
            ])
        )
    }
}

export = CardPicker