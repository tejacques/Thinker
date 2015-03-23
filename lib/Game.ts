import Nodes = require('./GameNode')
import GameCard = require('./GameCard')
import range = require('./range')
var cardList = GameCard.cardList
type Card = GameCard.Card

export class PlayerCard {
    card: number
    player: number
    constructor(card: number, player: number) {
        this.card = card
        this.player = player
    }
    clone() {
        return new PlayerCard(this.card, this.player)
    }
}

type Board = PlayerCard[]

export class Player {
    hand: number[]
    deck: number[]
    constructor(hand: number[], deck: number[]) {
        this.hand = hand.slice()
        //player.hand.map(card => new GameCard.Card(card))
        this.deck = deck.slice()
        //player.deck.map(card => new GameCard.Card(card))
    }
    clone() {
        return new Player(this.hand, this.deck)
    }
}

export enum RuleSet {
    AO,
    TO,
    Sam,
    Plu,
    // Com, Only exists in flags
    Rev,
    FA,
    Asc,
    Des,
    Rnd,
    // Swap, // Don't need to worry about this since it happens at game start
    Ord,
    Cha,
}

export enum RuleSetFlags {
    None = 0,
    AO = 0 << RuleSet.AO,
    TO  = 0 << RuleSet.Asc,
    Sam = 0 << RuleSet.Sam,
    Plu = 0 << RuleSet.Plu,
    Com = 0 << RuleSet.Sam || 0 << RuleSet.Plu,
    Rev = 0 << RuleSet.Rev,
    FA  = 0 << RuleSet.FA,
    Asc = 0 << RuleSet.Asc,
    Des = 0 << RuleSet.Des,
    Rnd = 0 << RuleSet.Rnd,
    Ord = 0 << RuleSet.Ord,
    Cha = 0 << RuleSet.Cha,
    // Swap, // Don't need to worry about this since it happens at game start
}

export class Game implements Nodes.GameNode<Game> {
    board: Board
    players: Player[]
    firstMove: number
    turn: number
    rules: RuleSetFlags
    move: {
        boardIndex: number
        handIndex: number
        player: number
        card: Card
    }
    originalNode: Game
    constructor(
        board: Board,
        players: Player[],
        turn: number,
        firstMove: number,
        rules: RuleSetFlags) {
        this.board = board.map((card) => card? card.clone() : null)
        this.players = players.map((player) => player.clone())
        this.turn = turn;
        this.firstMove = firstMove
        this.rules = rules
        this.originalNode = this
    }
    getPlayerId() {
        return (this.turn + this.firstMove) % this.players.length
    }
    getPlayer() {
        return this.players[this.getPlayerId()]
    }
    value() {
        var val = 0;
        var playerId = this.getPlayerId()
        this.board.forEach((card) => {
            if (card.player === playerId) val++
        })

        return val
    }
    isTerminal() {
        return this.board.filter(spot => !spot).length === 0
    }
    getMoveIterator() {
        // Can:
        // Play a card from the player's hand
        // For each card that is not known (face up), that card can be
        // and card from that player's deck, with the exception that
        // there can be no duplicates, and only one rare card
        //
        // The card can be played in any open spot on the board
        var player = this.getPlayer()

        var playableCards = player.hand
        var index = 0
        var handIndex = 0
        var deckIndex = 0
        var boardIndex = 0

        var getIndexes = (arr: Array<Object>) => arr
            .map((item, index) => item ? index : -1)
            .filter(val => val >= 0)

        var handIndexes = getIndexes(player.hand)
        var deckIndexes = range(0, player.deck.length)
        var boardIndexes = getIndexes(this.board)

        var iterator = {
            getNext: () => {
                if (handIndex < handIndexes.length
                    && boardIndex < boardIndexes.length) {
                    var cardId = player.hand
                }
                if (playableCards[index]) {
                    var node = this.playCard(
                        handIndex,
                        deckIndex,
                        boardIndex);
                    return node
                }

                return null;
            }
        }
        return iterator
    }
    clone() {
        return new Game(this.board, this.players, this.turn, this.firstMove, this.rules)
    }
    playCard(handIndex: number, deckIndex: number, boardIndex: number): Game {
        var node = this.clone()
        var playerId = node.turn % node.players.length
        var player = node.players[playerId]
        var cardId = player.hand[handIndex]

        // Remove card from player's hand. A value of null means that card has been played
        player.hand[handIndex] = null
        // Delete card from player's deck
        player.deck = player.deck.splice(deckIndex, 1)
        // Place the card on the board
        var playerCard = node.board[boardIndex] = new PlayerCard(cardId, playerId)
        var card = cardList[playerCard.card]

        // Set the move
        node.move = {
            boardIndex: boardIndex,
            handIndex: handIndex,
            player: playerId,
            card: card
        }

        // Apply capturing logic here to alter other board playerId
        // node.board ...
        var capturedPositions = [boardIndex];
        
        // Propogate as necessary
        while (capturedPositions.length > 0) {
            var nextCapturedPositions: number[] = []
            for (var i = 0; i < capturedPositions.length; i++) {
                var index = capturedPositions[i]
                var upIndex = index - 3
                var rightIndex = index + 1
                var downIndex = index + 3
                var leftIndex = index - 1

                var sideIndexes = [upIndex, rightIndex, downIndex, leftIndex]

                nextCapturedPositions = getCaptures(node, playerCard, sideIndexes)

                // Capture the positions
                nextCapturedPositions.forEach(index => {
                    node.board[index].player = playerId
                })
            }

            // If combo is in effect, keep going!
            if (node.rules & RuleSetFlags.Com) {
                capturedPositions = nextCapturedPositions
            }
        }

        // Bump turn number
        node.turn++
        return node
    }
}

var captures = (card: PlayerCard, other: PlayerCard, side: number) => {
    if (!card || !other || !side) {
        return false
    }
    if (card.player === other.player) {
        return false
    }

    var c = cardList[card.card]
    var o = cardList[other.card]
    if (c.sides[side] > o.sides[(side + 2) % 4]) {
        return true
    }

    return false
}

function getOppositeSide(side: number) {
    return getSide(side, 2)
}

function getSide(side: number, offset: number) {
    return (side + offset) % 4
}


function getCaptures(node: Game, playerCard: PlayerCard, sideIndexes: number[]): number[] {
    var capturedIndexes: number[] = []

    if (!playerCard) {
        return capturedIndexes
    }

    // Only capture if the card is present and the player is different
    var sides = sideIndexes.filter((side) =>
        node.board[side] && node.board[side].player !== playerCard.player)

    var card = cardList[playerCard.card]

    // Basic rule
    sides.forEach(side => {
        var sideCard = node.board[side]
        var otherCard = cardList[sideCard.card]
        var sideValue = card.sides[side];
        var otherValue = otherCard[getOppositeSide(side)]
        var rev = node.rules & RuleSetFlags.Rev
        if (rev && sideValue < otherValue
            || !rev && sideValue > otherValue) {
            capturedIndexes.push(side)
        }
    })

    // Rules.Sam
    if (node.rules & RuleSetFlags.Sam) {
        var samSides = sides.filter((side) => {
            var sideCard = node.board[side]
            var otherCard = cardList[sideCard.card]
            var sideValue = card.sides[side];
            var otherValue = otherCard[getOppositeSide(side)]

            return sideValue === otherValue
        })

        if (samSides.length > 1) {
            capturedIndexes.push.apply(capturedIndexes, samSides)
        }
    }

    // Rules.Plu
    if (node.rules & RuleSetFlags.Plu) {
    }

    return capturedIndexes
}