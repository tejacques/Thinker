﻿import Nodes = require('./GameNode')
import GameCard = require('./GameCard')
import range = require('./Range')
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

var emptyBoard = [
    null, null, null,
    null, null, null,
    null, null, null
]

export function newBoard() {
    return emptyBoard.slice()
}

type Hand = number[]
type Deck = number[]

export function getRandomHand(deck: Deck) {
    var hand: Hand = []

    for (var i = 0; i < 5; i++) {
        var r = (Math.random() * deck.length) | 0
        var cardId = deck[r]
        hand.push(cardId)
        deck = legalDeckFilter(hand, deck)
    }

    return hand
}

function legalDeckFilter(hand: number[], deck: number[]) {
    var handDict = {}
    var maxRarity = 0
    var handLen = hand.length
    for (var i = 0; i < handLen; i++) {
        var handId = hand[i]
        if (handId) {
            var card = cardList[handId]
            maxRarity = Math.max(maxRarity, card.rarity)
            handDict[handId] = null
        }
    }

    var hasRareCard = maxRarity >= 4
    return deck.filter(deckId =>
        !(deckId in handDict)
        && (!hasRareCard || cardList[deckId].rarity < 4))
}

export class Player {
    hand: number[]
    deck: number[]
    constructor(hand: number[], deck: number[]) {
        this.hand = hand.slice()
        this.deck = legalDeckFilter(hand, deck)
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
    Ord,
    Cha,
    SD,
    Swp, // Don't need to worry about this since it happens at game start
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
    SD  = 1 << RuleSet.SD,
    Swp = 1 << RuleSet.Swp, // Don't need to worry about this since it happens at game start
}

type BoardCaptures = NDictionary<RuleSetFlags, number[][]>

export class Game implements Nodes.GameNode<Game> {
    parent: Game
    board: Board
    players: Player[]
    firstMove: number
    turn: number
    rules: RuleSetFlags
    move: {
        boardIndex: number
        handIndex: number
        deckIndex: number
        player: number
        card: Card
        captures: BoardCaptures
    }
    originalNode: Game
    constructor(
        board: Board,
        players: Player[],
        turn: number,
        firstMove: number,
        rules: RuleSetFlags,
        parent?: Game) {
        this.board = board.map((card) => card? card.clone() : null)
        this.players = players.map((player) => player.clone())
        this.turn = turn;
        this.firstMove = firstMove
        this.rules = rules
        this.originalNode = this
        this.parent = parent || null
    }
    getPlayerId() {
        return (this.turn + this.firstMove) % this.players.length
    }
    getPlayer() {
        return this.players[this.getPlayerId()]
    }
    private _value: number = -10
    value() {
        if (this._value > -10) {
            return this._value
        }
        // This always scores the value for the first player
        var val = 0;
        //var playerId = this.getPlayerId()
        this.board.forEach((card) => {
            if (card) {
                if (card.player === 0) val++
                else val--
            }
        })

        val += this.firstMove-1

        this._value = val
        return val
    }
    playerValue(playerId: number) {
        var val = 0;
        this.board.forEach((card) => {
            if (card) {
                if (card.player === playerId) val++
            }
        })

        return val
    }
    isTerminal() {
        return this.turn === 9
        //return this.board.filter(spot => !spot).length === 0
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
        var deckIndexes = range(player.deck.length)
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
        node.parent = this
        var playerId = node.getPlayerId()
        var player = node.players[playerId]

        // Get the cardId. This is either from the hand, or the deck
        var handId = player.hand[handIndex]
        var deckId = player.deck[deckIndex]
        var cardId = handId || deckId
        var card = cardList[cardId]

        // Remove card from player's hand. A value of null means that card has been played
        player.hand[handIndex] = null

        // Remove card from player's deck, as well as any card that break the rarity rule
        if (player.deck.length) {
            if (card.rarity > 3) {
                var lastDeckID = player.deck[player.deck.length - 1]
                var lastDeckCard = cardList[lastDeckID]
                if (lastDeckCard.rarity > 3) {
                    player.deck = player.deck.filter(id => cardList[id].rarity <= 3)
                }
            }
            if (handId === 0) {
                player.deck.splice(deckIndex, 1)
            }
        }
        // Place the card on the board
        var playerCard = node.board[boardIndex] = new PlayerCard(cardId, playerId)

        // Set the move
        node.move = {
            boardIndex: boardIndex,
            handIndex: handIndex,
            deckIndex: deckIndex,
            player: playerId,
            card: card,
            captures: {},
        }

        // Apply capturing logic here to alter other board playerId
        // node.board ...
        var capturedPositions = [boardIndex];
        var com = false;

        var captureIndex = (index: number) => {
            node.board[index].player = playerId
        }

        // Propogate as necessary
        while (capturedPositions.length > 0) {
            var nextCapturedPositions: number[] = []
            for (var i = 0; i < capturedPositions.length; i++) {
                var index = capturedPositions[i]
                var captures = getCaptures(node, playerCard, index, com)

                for (var rule in captures) {
                    var ruleCaptures = node.move.captures[rule] = node.move.captures[rule] || []
                    ruleCaptures.push(captures[rule])
                }
                nextCapturedPositions = []

                nextCapturedPositions.push.apply(nextCapturedPositions, captures[RuleSetFlags.Sam])
                nextCapturedPositions.push.apply(nextCapturedPositions, captures[RuleSetFlags.Plu])
                nextCapturedPositions.push.apply(nextCapturedPositions, captures[RuleSetFlags.Com])

                com = true

                // Capture the positions
                nextCapturedPositions.forEach(captureIndex)
            }

            // If com is in effect, keep going!
            if (node.rules & RuleSetFlags.Com) {
                capturedPositions = nextCapturedPositions
            } else {
                capturedPositions = []
            }
        }

        // Capture the positions
        for (var rule in captures) {
            var ruleCaptures = node.move.captures[rule]
            ruleCaptures.forEach(captureLevel => captureLevel.forEach(captureIndex))
        }

        // Bump turn number
        node.turn++
        return node
    }
    toString() {
        // Retun a JSON representation of the board without metadata
        var s = '{'
        // Player info
        s+= 'P:'+JSON.stringify(this.players)

        // Board info
        s+= ',B:'+JSON.stringify(this.board)

        // Close
        s += '}'

        return s
    }
    history() {
        var sequence: Game[] = []

        var last = this
        do {
            sequence.push(last)
        } while (last = last.parent)

        return sequence.reverse()
    }
}

function getOppositeSide(side: number) {
    return getSide(side, 2)
}

function getSide(side: number, offset: number) {
    return (side + offset) % 4
}

interface SDictionary<T extends string, U> {
    [key: string]: U
}

interface NDictionary<T extends number, U> {
    [key: number]: U
}

function getCaptures(
    node: Game,
    playerCard: PlayerCard,
    index: number,
    com: boolean): NDictionary<RuleSetFlags, number[]> {
    var capturedIndexes: NDictionary<RuleSetFlags, number[]> = {}

    if (!playerCard) {
        return capturedIndexes
    }

    var x = index % 3
    var y = (index / 3) | 0
    var upIndex = index - 3
    var rightIndex = index + 1
    var downIndex = index + 3
    var leftIndex = index - 1

    var boardIndexes: number[][] = []

    if (y > 0) boardIndexes.push([upIndex, 0])
    if (x < 3) boardIndexes.push([rightIndex, 1])
    if (y < 3) boardIndexes.push([downIndex, 2])
    if (x > 0) boardIndexes.push([leftIndex, 3])

    // filter to only the valid board positions
    var validBoardIndexes = boardIndexes
        .filter(indexes => !!node.board[indexes[0]])

    // Only capture if the card is present and the player is different
    var filterOtherPlayer = indexes => {
        var boardIndex = indexes[0]
        return node.board[boardIndex].player !== playerCard.player
    }
    var filteredBoardIndexes = validBoardIndexes.filter(filterOtherPlayer)

    var card = cardList[playerCard.card]

    // Basic rule
    var basicCaptures = []
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
            basicCaptures.push(boardIndex)
        }
    })

    if (basicCaptures.length) {
        var ruleSet = node.rules & ~RuleSetFlags.Com
        capturedIndexes[ruleSet] = basicCaptures
    }

    var samCaptures = []
    // Rules.Sam
    // Can use own or opponents cards.
    if (!com && (node.rules & RuleSetFlags.Sam)) {
        var samFilter = indexes => {
            var boardIndex = indexes[0]
            var sideIndex = indexes[1]

            var sideCard = node.board[boardIndex]
            var otherCard = cardList[sideCard.card]

            var sideValue = card.sides[sideIndex];
            var otherValue = otherCard[getOppositeSide(sideIndex)]

            return sideValue === otherValue
        }

        var samSides = validBoardIndexes.filter(samFilter)

        if (samSides.length > 1) {
            var samFilteredSides = samSides.filter(filterOtherPlayer)
            if (samFilteredSides.length) {
                capturedIndexes[RuleSetFlags.Sam] = samFilteredSides.map(s => s[0])
            }
        }
    }

    // Rules.Plu
    // Can use own or opponents cards.
    if (!com && (node.rules & RuleSetFlags.Plu)) {
        var pluMap = indexes => {
            var boardIndex = indexes[0]
            var sideIndex = indexes[1]

            var sideCard = node.board[boardIndex]
            var otherCard = cardList[sideCard.card]

            var sideValue = card.sides[sideIndex];
            var otherValue = otherCard[getOppositeSide(sideIndex)]

            return sideValue + otherValue
        }

        var pluReducer = (
            accumulator: NDictionary<number, number[]>,
            value,
            index: number) => {
            var accVal = accumulator[value] = accumulator[value] || []
            accVal.push(index)
            return accumulator
        }

        // Get the sum of each pair
        // Get the list of indexes in validBoardIndexes with that sum
        var pluSides: NDictionary<number, number[]> = validBoardIndexes
            .map(pluMap)
            .reduce(pluReducer, {})

        var pluIndexes: number[] = []
        for (var sum in pluSides) {
            if (pluSides.hasOwnProperty(sum)) {
                if (pluSides[sum].length > 1) {
                    pluIndexes.push.apply(pluIndexes, pluSides[sum])
                }
            }
        }

        if (pluIndexes.length > 1) {
            var pluFilteredSides = pluIndexes
                .map(index => boardIndexes[index])
                .filter(filterOtherPlayer)
            if (pluFilteredSides.length) {
                capturedIndexes[RuleSetFlags.Plu] = pluFilteredSides.map(s => s[0])
            }
        }
    }

    return capturedIndexes
}