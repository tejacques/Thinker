import GameCard = require('../../lib/GameCard')
import React = require('react')

var assetsBase = '/assets/'
var imageBase = assetsBase + 'img/'
var imageExtension = '.png'
var cardBgImg = '/assets/img/bg.png'

enum ImageType {
    Background,
    Face,
    Number,
    Stars,
    Type
}

var imagePath: {[ImageType: number]: string} = {}
imagePath[ImageType.Background] = 'bg'
imagePath[ImageType.Background] = 'face/'
imagePath[ImageType.Number] = 'number/'
imagePath[ImageType.Stars] = 'stars/'
imagePath[ImageType.Type] = 'type/'

function cardImgSrc(card: GameCard.Card): string {
    return imageBase
        + imagePath[ImageType.Face]
        + card.number
        + imageExtension
}

function starsImgSrc(card: GameCard.Card): string {
    return imageBase
        + imagePath[ImageType.Stars]
        + card.rarity
        + imageExtension
}

function sideImgSrc(card: GameCard.Card, side: number): string {
    return imageBase
        + imagePath[ImageType.Stars]
        + card.sides[side]
        + imageExtension
}

var cardContainerStyle: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    height: 128,
    width: 104,
    zIndex: -1
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

class Card extends React.Component<GameCard.Card, void> {
    render() {
        return React.DOM.span({
            style: cardContainerStyle
        },
        [
            React.DOM.img({
                src: cardBgImg
            }),
            React.DOM.img({
                src: cardImgSrc(this.props)
            }),
            React.DOM.img({
                src: starsImgSrc(this.props),
                style: starsStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(this.props, 0),
                style: sideTopStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(this.props, 1),
                style: sideRightStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(this.props, 2),
                style: sideBottomStyle,
            }),
            React.DOM.img({
                src: sideImgSrc(this.props, 3),
                style: sideLeftStyle,
            }),
        ])
    }
}

export = Card