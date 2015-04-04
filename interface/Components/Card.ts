import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import React = require('react')
import Config = require('../Config')
import Utils = require('../Utils')

var imageBase = Config.imageBase
var imageExtension = Config.imageExtension
var cardBgImg = Config.cardBgImg

enum ImageType {
    Background,
    Face,
    Number,
    Stars,
    Type
}

var imagePath: {[ImageType: number]: string} = {}
imagePath[ImageType.Background] = 'bg'
imagePath[ImageType.Face] = 'face/'
imagePath[ImageType.Number] = 'number/'
imagePath[ImageType.Stars] = 'stars/'
imagePath[ImageType.Type] = 'type/'

var pad = Utils.pad

function cardBgSrc(playercard: Game.PlayerCard) {
    return imageBase
        + imagePath[ImageType.Background]
        + playercard.player
        + imageExtension
}

function cardImgSrc(card: GameCard.Card): string {
    return imageBase
        + imagePath[ImageType.Face]
        + pad(3, '0', card.number)
        + imageExtension
}

function starsImgSrc(card: GameCard.Card): string {
    return imageBase
        + imagePath[ImageType.Stars]
        + card.rarity + 'stars'
        + imageExtension
}

function sideImgSrc(card: GameCard.Card, side: number): string {
    return imageBase
        + imagePath[ImageType.Number]
        + card.sides[side]
        + imageExtension
}

function typeImgSrc(card: GameCard.Card): string {
    return imageBase
        + imagePath[ImageType.Type]
        + card.type
        + imageExtension
}

var cardContainerStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    height: 128,
    width: 104,
}

var cardImgStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
}

var starsStyle: React.CSSProperties = {
    position: 'absolute',
    top: 6,
    left: 9,
}

var sideTopStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 26,
    left: 45,
}

var sideBottomStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 12,
    left: 45,
}

var sideRightStyle: React.CSSProperties = {
    position: 'absolute',
    right: 30,
    bottom: 19,
}

var sideLeftStyle: React.CSSProperties = {
    position: 'absolute',
    left: 32,
    bottom: 19,
}

var cardTypeStyle: React.CSSProperties = {
    position: 'absolute',
    top: 3,
    right: 3,
}

interface CardProps {
    playerCard: Game.PlayerCard
}

class Card extends React.Component<CardProps, void> {
    render() {
        var playerCard = this.props.playerCard
        var noCard = (!playerCard
            || (playerCard.card === null)
            || (typeof playerCard.card === 'undefined')
            || (playerCard.card & 0x7F) === 0x7F)

        if (noCard) {
            return null
        }

        var noPlayer = (null === playerCard.player)
            || (typeof playerCard.player === 'undefined')

        var card = GameCard.cardList[playerCard.card]
        var cardParts: React.ReactElement<any>[] = []

        // Background
        if (card.number > 0) {
            cardParts.push(React.DOM.img({
                src: noPlayer
                    ? cardBgImg
                    : cardBgSrc(playerCard),
                style: cardImgStyle,
            }))
        }

        // Face
        cardParts.push(React.DOM.img({
            src: cardImgSrc(card),
            style: cardImgStyle,
        }))

        if (card.number > 0) {
            // Stars
            cardParts.push(React.DOM.img({
                src: starsImgSrc(card),
                style: starsStyle,
            }))

            // Sides
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 0),
                style: sideTopStyle,
            }))
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 1),
                style: sideRightStyle,
            }))
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 2),
                style: sideBottomStyle,
            }))
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 3),
                style: sideLeftStyle,
            }))

            // Type
            if (card.type > 0) {
                cardParts.push(React.DOM.img({
                    src: typeImgSrc(card),
                    style: cardTypeStyle,
                }))
            }
        }

        return React.DOM.span({
            style: cardContainerStyle
        }, cardParts)
    }
}

export = Card