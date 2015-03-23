﻿import Nodes = require('./GameNode')
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
    AO = 1 << RuleSet.AO,
    TO  = 1 << RuleSet.Asc,
    Sam = 1 << RuleSet.Sam,
    Plu = 1 << RuleSet.Plu,
    Com = 1 << RuleSet.Sam | 1 << RuleSet.Plu,
    Rev = 1 << RuleSet.Rev,
    FA  = 1 << RuleSet.FA,
    Asc = 1 << RuleSet.Asc,
    Des = 1 << RuleSet.Des,
    Rnd = 1 << RuleSet.Rnd,
    Ord = 1 << RuleSet.Ord,
    Cha = 1 << RuleSet.Cha,
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
        // This always scores the value for the first player
        var val = 0;
        var playerId = this.getPlayerId()
        this.board.forEach((card) => {
            if (card && card.player === 0) val++
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

        var getIndexes = (arr: Array<Object>, predicate: (item: Object, index?: number) => boolean) => arr
            .map((item, index) => predicate(item, index) ? index : -1)
            .filter(val => val >= 0)

        // Valid hand indexes are any non nulls
        var handIndexes = getIndexes(player.hand, item => item !== null)
        // Valid deck indexes are any
        var deckIndexes = range(0, player.deck.length)
        // Valid board indexes are nulls (unplayed positions)
        var boardIndexes = getIndexes(this.board, item => !item)
        var lookedThroughDeck = false;

        var iterator = {
            getNext: () => {
                if (handIndex < handIndexes.length) {
                    var handIdx = handIndexes[handIndex]
                    var deckIdx = deckIndexes[deckIndex]
                    var boardIdx = boardIndexes[boardIndex]
                    var node = this.playCard(
                        handIdx,
                        deckIdx,
                        boardIdx
                    );

                    // Go to the next move
                    var handCardId = player.hand[handIdx]

                    // If our hand card is a 0 and we haven't looked through
                    // the deck yet
                    if (!lookedThroughDeck
                        && handCardId === 0
                        && deckIndex < deckIndexes.length - 1) {
                        // If we have more cards to look through in the deck:
                        // -1 to deckIndexex.length because we just
                        // evaluated one so we're really in a do..while loop
                        // equivalent.We only want to evaluate the next one
                        // if it is valid
                        deckIndex++
                    } else if (boardIndex < boardIndexes.length -1) {
                        // If we have more board positions to look through
                        // -1 to boardIndexes.length because we just
                        // evaluated one so we're really in a do..while loop
                        // equivalent.We only want to evaluate the next one
                        // if it is valid
                        deckIndex = 0
                        boardIndex++
                    } else {
                        boardIndex = 0
                        handIndex++

                        // If the hand card is a 0, we must have looked through
                        // the deck once we've gotten here
                        if (!lookedThroughDeck
                            && handCardId === 0) {
                            lookedThroughDeck = true
                        }
                    }

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
        var playerId = node.getPlayerId()
        var player = node.players[playerId]

        // Get the cardId. This is either from the hand, or the deck
        var handId = player.hand[handIndex]
        var deckId = player.deck[deckIndex]
        var cardId = handId || deckId

        // Remove card from player's hand. A value of null means that card has been played
        player.hand[handIndex] = null
        // Delete card from player's deck
        if (player.deck.length && handId === 0) {
            player.deck = player.deck.splice(deckIndex, 1)
        }
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
            } else {
                capturedPositions = []
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

function getCaptures(node: Game, playerCard: PlayerCard, boardIndexes: number[]): number[] {
    var capturedIndexes: number[] = []

    if (!playerCard) {
        return capturedIndexes
    }

    // Only capture if the card is present and the player is different
    var filteredBoardIndexes = boardIndexes
        .map((boardIndex, index) => [boardIndex, index])
        .filter((indexes) => {
            var boardIndex = indexes[0]
            return node.board[boardIndex]
                && node.board[boardIndex].player !== playerCard.player
        })

    var card = cardList[playerCard.card]

    // Basic rule
    filteredBoardIndexes.forEach(indexes => {
        var boardIndex = indexes[0]
        var sideIndex = indexes[1]

        // Get the side Index
        var sideCard = node.board[boardIndex]
        var otherCard = cardList[sideCard.card]

        var sideValue = card.sides[sideIndex];
        var otherValue = otherCard.sides[getOppositeSide(sideIndex)]
        var rev = node.rules & RuleSetFlags.Rev
        if (rev && sideValue < otherValue
            || !rev && sideValue > otherValue) {
            capturedIndexes.push(boardIndex)
        }
    })

    // Rules.Sam
    if (node.rules & RuleSetFlags.Sam) {
        var samSides = filteredBoardIndexes.filter(indexes => {
            var boardIndex = indexes[0]
            var sideIndex = indexes[1]

            var sideCard = node.board[boardIndex]
            var otherCard = cardList[sideCard.card]

            var sideValue = card.sides[sideIndex];
            var otherValue = otherCard[getOppositeSide(sideIndex)]

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