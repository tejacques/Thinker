import Game = require('../../lib/Game')
import GameCard = require('../../lib/GameCard')
import React = require('react')

var assetsBase = 'assets/'
var imageBase = assetsBase + 'img/'
var imageExtension = '.png'
var cardBgImg = imageBase + 'bg.png'
var faceDownImg = imageBase + 'face/000.png'
faceDownImg = cardBgImg

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

function pad(num: number, separator: string, s) {
    var str = String(s)
    num = num-str.length
    var padding: string
    if (num > 0) {
        padding = Array(num + 1).join(separator)
    } else {
        padding = ''
    }
    var res = padding + str
    console.log(res)
    return res
}

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

var cardContainerStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    height: 128,
    width: 104,
    zIndex: -1,
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

class Card extends React.Component<Game.PlayerCard, void> {
    render() {
        var noCard = (this.props.card === null
            || (this.props.card & 0x7F) === 0x7F)

        if (noCard) {
            return null
        }

        var faceDown = (this.props.card === 0)

        if (faceDown) {
            return React.DOM.span({
                style: cardContainerStyle
            }, React.DOM.img({
                    src: faceDownImg,
                    style: cardImgStyle
            }))
        }

        var card = GameCard.cardList[this.props.card]

        return React.DOM.span({
            style: cardContainerStyle
        },
        [
            React.DOM.img({
                src: cardBgSrc(this.props),
                style: cardImgStyle,
            }),
            React.DOM.img({
                src: cardImgSrc(card),
                style: cardImgStyle,
            }),
            React.DOM.img({
                src: starsImgSrc(card),
                style: starsStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(card, 0),
                style: sideTopStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(card, 1),
                style: sideRightStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(card, 2),
                style: sideBottomStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(card, 3),
                style: sideLeftStyle,
            }),
        ])
    }
}

export = Card