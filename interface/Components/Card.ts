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

function cardBgSrc(playercard: number) {
    return imageBase
        + imagePath[ImageType.Background]
        + Game.GetPlayer(playercard)
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

var cardBonusColor = '#55A'
var positiveShadow = '0px 0px 1px #99D4E6,'
    + ' 0px 0px 2px #2EABCF,'
    + ' 0px 0px 3px #2EABCF,'
    + ' 0px 0px 4px #2EABCF';

var negativeShadow = '0px 0px 1px #E6442B,'
    + ' 0px 0px 2px #CF3319,'
    + ' 0px 0px 3px #CF3319,'
    + ' 0px 0px 4px #CF3319';

function createBonusStyle(positive): React.CSSProperties {
    return {
        position: 'absolute',
        fontFamily: 'Helvetica',
        top: 50,
        left: 40,
        color: 'white',
        textShadow: positive ? positiveShadow : negativeShadow,
        fontSize: 20,
    }
}

var positiveCardBonusStyle = createBonusStyle(true)
var negativeCardBonusStyle = createBonusStyle(false)

interface CardProps {
    playerCard: number
    game?: Game.Game
}

class Card extends React.Component<CardProps, void> {
    render() {
        var playerCard = this.props.playerCard
        var noCard = playerCard === 0xFF

        if (noCard) {
            return null
        }

        var noPlayer = !Game.HasPlayer(playerCard)

        var card = GameCard.cardList[Game.GetCardId(playerCard)]
        var cardParts: React.ReactElement<any>[] = []

        // Background
        if (card.number > 0) {
            cardParts.push(React.DOM.img({
                src: noPlayer
                    ? cardBgImg
                    : cardBgSrc(playerCard),
                style: cardImgStyle,
                key: 'background',
            }))
        }

        // Face
        cardParts.push(React.DOM.img({
            src: cardImgSrc(card),
            style: cardImgStyle,
            key: 'face',
        }))

        if (card.number > 0) {
            // Stars
            cardParts.push(React.DOM.img({
                src: starsImgSrc(card),
                style: starsStyle,
                key: 'stars',
            }))

            // Sides
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 0),
                style: sideTopStyle,
                key: 'side_0',
            }))
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 1),
                style: sideRightStyle,
                key: 'side_1',
            }))
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 2),
                style: sideBottomStyle,
                key: 'side_2',
            }))
            cardParts.push(React.DOM.img({
                src: sideImgSrc(card, 3),
                style: sideLeftStyle,
                key: 'side_3',
            }))

            // Type
            if (card.type > 0) {
                cardParts.push(React.DOM.img({
                    src: typeImgSrc(card),
                    style: cardTypeStyle,
                    key: 'type',
                }))

                // Type Bonus
                var game = this.props.game
                var bonus = 0
                if (game && (bonus = Game.getCardTypeBonus(card, game))) {
                    cardParts.push(React.DOM.span({
                        style: (bonus > 0
                            ? positiveCardBonusStyle
                            : negativeCardBonusStyle),
                        key: 'type_bonus',
                    }, [
                        React.DOM.span({
                            style: {
                                position: 'absolute',
                            }
                        }, (bonus > 0 ? '+' : '-')),
                        React.DOM.span({
                            style: {
                                position: 'absolute',
                                left: 11,
                            }
                        }, Math.abs(bonus))
                    ]))
                }
            }
        }

        return React.DOM.span({
            style: cardContainerStyle
        }, cardParts)
    }
}

export = Card