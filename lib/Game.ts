﻿import Nodes = require('./GameNode')
import GameCard = require('./GameCard')
import range = require('./Range')
import Choose = require('./Choose')
export var cardList = GameCard.cardList
export var cardIds = range(1, 80)
type Card = GameCard.Card

export function CreatePlayerCard(card: number, player: number) {
    return card === 0xFF ? 0xFF : ((card & 0x7F) | (player|0) << 7)
}

export function HasPlayer(boardCard: number) {
    return GetPlayer(boardCard) < 2
}

export function GetPlayer(boardCard: number) {
    return boardCard >> 7
}

export function GetCardId(boardCard: number) {
    return boardCard & 0x7F
}

type PlayerCard = number

type Board = number[]

var emptyBoard: Board = [
    0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF
]

export function newBoard() {
    return emptyBoard.slice()
}

type Hand = number[]
type Deck = number[]

export function getRandomHand(deck: Deck, rarityRestriction: number) {
    var hand: Hand = []

    for (var i = 0; i < 5; i++) {
        var r = (Math.random() * deck.length) | 0
        var cardId = deck[r]
        hand.push(cardId)
        deck = legalDeckFilter(hand, deck, rarityRestriction)
    }

    return hand
}

var rarityIdMap: number[] = [
    0,  // 0
    0,  // 1
    20, // 2
    36, // 3
    50, // 4
    60  // 5
]

var rarityIdMapDefault = 80

export function UpdateDeckMove(
    node: Game,
    move: GameMove
) {
    var player = node.getPlayer()
    var cardId = move.card.number
    var fromDeck = cardId === move.deckId
    var deck = player.deck
    deck[cardId] = 0
    var deckInfo = player.deckInfo
    
    if (fromDeck && player.deckInfo.lowest === cardId) {
        while(deck[deckInfo.lowest] === 0) {
            player.deckInfo.lowest++
        }
    }
    var rarityIndex = rarityIdMap[player.rarityRestriction] || rarityIdMapDefault
    var max = rarityIdMapDefault // all card OK
    if (cardId > rarityIndex) {
        max = rarityIndex
    }
    var newMax = Math.min(player.deckInfo.highest, max)
    if (player.deckInfo.highest > newMax) {
        player.deckInfo.highest = newMax
    }
    
    if (fromDeck && player.deckInfo.highest === cardId) {
        while(deck[deckInfo.highest] === 0) {
            player.deckInfo.highest--
        }
    }
    
    // Set move info
    move.deckLowest = player.deckInfo.lowest
    move.deckHighest = player.deckInfo.highest
}

export function ApplyDeckMove(
    node: Game,
    move: GameMove
) {
    var player = node.getPlayer()
    var deck = player.deck
    var cardId = move.card.number
    var fromDeck = move.deckId > 0
    
    player.deckInfo.lowest = move.deckLowest
    player.deckInfo.highest = move.deckHighest
    
    if (fromDeck) {
        deck[cardId] = 0
    }
}

export function UnApplyDeckMove(
    node: Game,
    move: GameMove
) {
    var player = node.getPlayer()
    var deck = player.deck
    var cardId = move.card.number
    var fromDeck = move.deckId > 0
    
    player.deckInfo.lowest = move.lastDeckLowest
    player.deckInfo.highest = move.lastDeckHighest
    
    if (fromDeck) {
        deck[cardId] = cardId
    }
}

export function legalDeckFilter(
        hand: number[],
        deck: number[],
        rarityRestriction: number) {

    var handDict: { [key: number]: boolean } = {}
    var maxCardId = 0
    var handLen = hand.length
    var i: number
    for (i = 0; i < handLen; i++) {
        var handId = hand[i]
        if (handId) {
            maxCardId = Math.max(maxCardId, handId)
            handDict[handId] = true
        }
    }

    var rarityThresholdId = rarityIdMap[rarityRestriction] || rarityIdMapDefault
    var hasRareCard = maxCardId > rarityThresholdId


    var deckLen = deck.length
    var newDeckLen = 0
    for (i = 0; i < deckLen; i++) {
        var deckId = deck[i];
        if (deckId && !(deckId in handDict)) {
            if (!hasRareCard || deckId <= rarityThresholdId) {
                newDeckLen++
            }
        }
    }

    var newDeck: number[] = new Array(newDeckLen)
    var newDeckIndex = 0
    for (i = 0; i < deckLen; i++) {
        var deckId = deck[i];
        if (deckId && !(deckId in handDict)) {
            if (!hasRareCard || deckId <= rarityThresholdId) {
                newDeck[newDeckIndex++] = deckId
            }
        }
    }

    return newDeck
}

export class Player {
    hand: number[]
    deck: number[]
    rarityRestriction: number
    numFaceDownCards: number
    deckInfo: {
        lowest: number
        highest: number
    }
    constructor(
        hand: number[],
        deck: number[],
        rarityRestriction: number = 4,
        numFaceDownCards?: number,
        lowest: number = 0,
        highest: number = 80) {
        this.hand = hand.slice()
        this.rarityRestriction = rarityRestriction
        this.deck = legalDeckFilter(hand, deck, this.rarityRestriction)
        if (numFaceDownCards !== undefined) {
            this.numFaceDownCards = numFaceDownCards
        } else {
            this.numFaceDownCards = 0
            for (var handIndex = 0, handLen = hand.length;
                handIndex < handLen; handIndex++) {
                var cardId = this.hand[handIndex]
                if (cardId === 0) {
                    this.numFaceDownCards++
                }
            }
        }
        this.deckInfo = {
            lowest: lowest,
            highest: highest,
        }
    }
    clone() {
        return new Player(
            this.hand,
            this.deck,
            this.rarityRestriction,
            this.numFaceDownCards,
            this.deckInfo.lowest,
            this.deckInfo.highest)
    }
}

export enum RuleSet {
    None,// 00
    Rou, // 01
    AO,  // 02
    TO,  // 03
    Sam, // 04
    SD,  // 05
    Plu, // 06
    Rnd, // 07
    Ord, // 08
    Cha, // 09
    Rev, // 0A = 10
    FA,  // 0B = 11
    Asc, // 0C = 12
    Des, // 0D = 13
    Swp, // 0E = 14 Don't need to worry about this since
         //         it happens at game start
}

export enum RuleSetFlags {
    None = 0,
    Rou = 1 << RuleSet.Rou,
    AO = 1 << RuleSet.AO,
    TO  = 1 << RuleSet.TO,
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

var words = [
    'All',       //  0
    'Ace',       //  1
    'Three',     //  2
    'Open',      //  3
    'Plus',      //  4
    'Minus',     //  5
    'Same',      //  6
    'Different', //  7
    'Reverse',   //  8
    'Forwards',  //  9
    'Fallen',    // 10
    'Risen',     // 11
    'Ascension', // 12
    'Descension',// 13
    'Order',     // 14
    'Chaos',     // 15
    'Sudden',    // 16
    'Death',     // 17
    'Swap',      // 18
    'Random',    // 19
]

export function RuleSetFlagsToStrings(ruleSetFlags: RuleSetFlags) {
    var res: string[] = []
    var s: string

    if (ruleSetFlags & RuleSetFlags.AO) {
        s = words[0] + ' ' + words[3]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.TO) {
        s = words[2] + ' ' + words[3]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Sam) {
        s = words[6]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Plu) {
        s = words[4]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Rev) {
        s = words[8]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.FA) {
        s = words[10] + ' ' + words[1]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Asc) {
        s = words[12]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Des) {
        s = words[13]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Rnd) {
        s = words[19]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Ord) {
        s = words[14]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Cha) {
        s = words[15]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.SD) {
        s = words[16] + ' ' + words[17]
        res.push(s)
    }
    if (ruleSetFlags & RuleSetFlags.Swp) {
        s = words[18]
        res.push(s)
    }

    return res
}

type BoardCaptures = NDictionary<RuleSetFlags, number[][]>

function hasFaceDownCard(hand: number[]) {
    var len = hand.length
    for (var i = 0; i < len; i++) {
        if (hand[i] === 0) return true
    }
    return false
}

function getIndexes(
    arr: Array<Object>,
    predicate: (item: Object, index?: number) => boolean) {

    var len = arr.length
    var indexes: number[] = []

    for (var i = 0; i < len; i++) {
        var item = arr[i]
        if (predicate(item, i)) {
            indexes.push(i)
        }
    }

    return indexes
}

function getPlayableBoardIndexes(board: Board) {
    var len = board.length
    var playableIndexes: number[] = []
    for (var i = 0; i < len; i++) {
        var playerCard = board[i]
        if (!playerCard) {
            playableIndexes.push(i)
        }
    }
    return playableIndexes
}

export interface GameMove {
    boardIndex: number
    handIndex: number
    handId: number
    deckIndex: number
    deckId: number
    player: number
    card: Card
    captures: BoardCaptures
    deckLowest: number
    deckHighest: number
    lastDeckLowest: number
    lastDeckHighest: number
    returns?: PlayerCard[][]
}

var captureIndex = (node: Game, index: number, playerId: number) => {
    node.board[index] = CreatePlayerCard(node.board[index], playerId)
}

export class Game implements
    Nodes.GameNode<Game>,
    Nodes.PDGameNode<Game>
{
    parent: Game
    board: Board
    players: Player[]
    firstMove: number
    turn: number
    rules: RuleSetFlags
    move: GameMove
    originalNode: Game
    zobristLow: number
    zobristHigh: number
    bonus: number[]
    constructor(
        board: Board,
        players: Player[],
        turn: number,
        firstMove: number,
        rules: RuleSetFlags,
        value: number = 0,
        parent?: Game,
        bonus?: number[]
        ) {
        this.board = board.slice()
        this.players = players.map((player) => player.clone())
        this.turn = turn;
        this.firstMove = firstMove
        this.rules = rules
        this.originalNode = this
        this._value = value
        this.parent = parent || null
        this.bonus = bonus && bonus.slice() || [0, 0, 0, 0, 0]
    }
    clone() {
        var node = new Game(
            this.board,
            this.players,
            this.turn,
            this.firstMove,
            this.rules,
            this._value,
            this.parent,
            this.bonus)
        return node
    }
    getPlayerId() {
        return (this.turn + this.firstMove) % this.players.length
    }
    getOtherPlayerId() {
        return (this.turn + this.firstMove + 1) % this.players.length
    }
    getPlayer() {
        return this.players[this.getPlayerId()]
    }
    getOtherPlayer() {
        return this.players[this.getOtherPlayerId()]
    }
    private _value: number = 0
    value() {
        // Sum of weight_feature * feature
        // This always scores the value for the first player

        // Primary Feature -- how many cards are controlled by the players
        var cardsControlled: [number, number] = [0, 0];
        var exposedSides: [number, number] = [0, 0]
        var exposedValues: [number, number] = [0, 0]

        for (var boardIndex = 0; boardIndex < this.board.length; boardIndex++) {
            var playerCard = this.board[boardIndex]
            var cardId = GetCardId(playerCard)
            var playerId = GetPlayer(playerCard)
            if (cardId) {
                cardsControlled[playerId]++

                var x = boardIndex % 3
                var y = (boardIndex / 3) | 0
                var upIndex = boardIndex - 3
                var rightIndex = boardIndex + 1
                var downIndex = boardIndex + 3
                var leftIndex = boardIndex - 1

                var boardIndexes: number[][] = []
                var card = cardList[cardId]

                if (y > 0 && !this.board[upIndex]) {
                    // Up
                    exposedSides[playerId]++
                    exposedValues[playerId] += card.sides[0]
                }
                if (x < 2 && !this.board[rightIndex]) {
                    // Right
                    exposedSides[playerId]++
                    exposedValues[playerId] += card.sides[1]
                }
                if (y < 2 && !this.board[downIndex]) {
                    // Down
                    exposedSides[playerId]++
                    exposedValues[playerId] += card.sides[2]
                }
                if (x > 0 && !this.board[leftIndex]) {
                    // Left
                    exposedSides[playerId]++
                    exposedValues[playerId] += card.sides[3]
                }
            }
        }

        for (var playerId = 0; playerId < this.players.length; playerId++) {
            var hand = this.players[playerId].hand
            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                if (0xFF !== hand[handIndex]) {
                    cardsControlled[playerId]++
                }
            }
        }

        var cardsControlledWeight = 100
        var exposedSidesWeight = -5
        var exposedValuesWeight = 5

        var cc = cardsControlledWeight *
            (cardsControlled[0] - cardsControlled[1])

        var es = exposedSidesWeight * (exposedSides[0] - exposedSides[1])

        var ev = exposedValuesWeight * (
            (exposedValues[0] ? (exposedValues[0] / exposedSides[0]) : 0) -
            (exposedValues[1] ? (exposedValues[1] / exposedSides[1]) : 0)
            )

        this._value = cc
            + es
            //+ ev

        return this._value
    }
    playerValue(playerId: number) {
        var val = 0;
        this.board.forEach((card) => {
            if (card) {
                var cardPlayerId = GetPlayer(card)
                if (cardPlayerId === playerId) val++
            }
        })

        this.players[playerId].hand.forEach(card => {
            if (card !== 0xFF) {
                val++
            }
        })

        return val
    }
    isTerminal() {
        return this.turn === 9
            // Game is tied and SD rule is active
            && !this.isSD()
    }
    isSD() {
        return ((this.rules & RuleSetFlags.SD) && this.value() === 0)
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

        // Valid hand indexes are any non 0xFF value
        var handIndexes = getIndexes(player.hand, item => item !== 0xFF)
        var handLen = (this.rules & RuleSetFlags.Ord)
            ? 1
            : handIndexes.length
        // Valid deck indexes are any
        var deckIndexes = range(player.deck.length)
        // Valid board indexes are 0xFF (unplayed positions)
        var boardIndexes = getIndexes(this.board, item => item === 0xFF)
        var lookedThroughDeck = false;

        var iterator = {
            getNext: () => {
                if (handIndex < handLen) {
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
    getDeterministicMoves() {
        // Gets only the face up card moves
        var player = this.getPlayer()

        var playableCards = player.hand
        var index = 0
        var handIndex = 0
        var handLen = player.hand.length
        // Valid board indexes are values of 0xFF (unplayed positions)
        var boardIndexes = getIndexes(this.board, item => item === 0xFF)
        var boardIndex = 0
        var moves: Game[] = []
        var ord = (this.rules & RuleSetFlags.Ord) > 0

        // Valid hand indexes are values greater than 0 and not 0xFF
        for (handIndex = 0; handIndex < handLen; handIndex++) {
            var cardId = player.hand[handIndex]
            if (0 === cardId || 0xFF === cardId) {
                continue
            }
            for (boardIndex = 0; boardIndex < boardIndexes.length; boardIndex++) {
                var boardIdx = boardIndexes[boardIndex]
                var node = this.playCard(
                    handIndex,
                    0,
                    boardIdx)
                moves.push(node)
            }
            if (ord) {
                return moves
            }
        }

        return moves
    }
    getProbabilisticMoves() {
        // Gets only the face up card moves
        var player = this.getPlayer()

        var playableCards = player.hand
        var index = 0
        var handIndex = 0
        var handLen = player.hand.length
        var deckIndex = 0
        var deckLen = player.hand.length
        // Valid board indexes are 0xFF (unplayed positions)
        var boardIndexes = getIndexes(this.board, item => item === 0xFF)
        var boardIndex = 0
        var moves: Game[] = []

        var hasFaceDownCard = false
        var ord = (this.rules & RuleSetFlags.Ord) > 0

        for(handIndex = 0; handIndex < handLen; handIndex++) {
            var cardId = player.hand[handIndex]
            if (cardId === 0) {
                hasFaceDownCard = true
                break
            } else if (ord) {
                break
            }
        }

        // Valid hand indexes are values greater than 0 and not 0xFF
        for (boardIndex = 0; hasFaceDownCard && boardIndex < boardIndexes.length; boardIndex++) {
            var boardIdx = boardIndexes[boardIndex]
            for (deckIndex = 0; deckIndex < deckLen; deckIndex++) {
                var node = this.playCard(
                    handIndex,
                    player.deck[deckIndex],
                    boardIdx)
                moves.push(node)
            }
        }

        return moves
    }
    pBestMove(rank: number, num: number) {
        // Other player because we're looking at the person who just went
        var player = this.getOtherPlayer()
        var hand = player.hand
        var handIndex: number
        var handLen = hand.length
        var numFaceDownCards = player.numFaceDownCards
        var p = Choose(player.deck.length, numFaceDownCards - 1) /
            Choose(num, numFaceDownCards)

        return p
    }
    playCard(handIndex: number, deckIndex: number, boardIndex: number): Game {
        var node = this.clone()
        node.parent = this
        Game.playCardStatic(node, handIndex, deckIndex, boardIndex)
        return node
    }
    static playCardStatic(node: Game, handIndex: number, deckIndex: number, boardIndex: number): GameMove {
        var playerId = node.getPlayerId()
        var player = node.players[playerId]

        // Get the cardId. This is either from the hand, or the deck
        var handId = player.hand[handIndex]
        var deckId = player.deck[deckIndex]
        var cardId = handId || deckId
        var card = cardList[cardId]

        // Set the move
        node.move = {
            boardIndex: boardIndex,
            handIndex: handIndex,
            handId: handId,
            deckIndex: deckIndex,
            deckId: deckId,
            player: playerId,
            deck: player.deck,
            card: card,
            captures: {},
            deckLowest: player.deckInfo.lowest,
            deckHighest: player.deckInfo.highest,
            lastDeckLowest: player.deckInfo.lowest,
            lastDeckHighest: player.deckInfo.highest,
            returns: [],
        }
        
        if (handId === 0) {
            player.numFaceDownCards--
        }

        // Remove card from player's deck, as well as any card that break the rarity rule
        // TODO: Remove this in favor of other method
        if (player.deck.length) {
            if (handId === 0) {
                player.hand[handIndex] = cardId
            }
            player.deck = legalDeckFilter(player.hand, player.deck, player.rarityRestriction)
        }
        
        // Update move with new deck info
        if (player.deck) {
            UpdateDeckMove(node, node.move)
        }
        
        // Place the card on the board
        var playerCard = node.board[boardIndex] = CreatePlayerCard(cardId, playerId)

        // Remove card from player's hand. A value of 0xFF means that card has been played
        player.hand[handIndex] = 0xFF

        // Apply capturing logic here to alter other board playerId
        // node.board ...
        var capturedPositions = [boardIndex];
        var com = false;

        var captureIndex = (node: Game, index: number, playerId: number) => {
            node.board[index] = CreatePlayerCard(GetCardId(node.board[index]), playerId)
        }

        // Propogate as necessary
        while (capturedPositions.length > 0) {
            var nextCapturedPositions: number[] = []
            for (var i = 0; i < capturedPositions.length; i++) {
                var index = capturedPositions[i]
                var playedCard = node.board[index]
                var captures = getCaptures(node, playedCard, index, com)

                for (var rule in captures) {
                    var ruleCaptures = node.move.captures[rule] = node.move.captures[rule] || []
                    ruleCaptures.push(captures[rule])
                }
                var currentCapturePositions: number[] = []

                currentCapturePositions.push.apply(currentCapturePositions, captures[RuleSetFlags.Sam])
                currentCapturePositions.push.apply(currentCapturePositions, captures[RuleSetFlags.Plu])
                currentCapturePositions.push.apply(currentCapturePositions, captures[RuleSetFlags.Com])

                com = true

                // Capture the positions
                currentCapturePositions.forEach(index => captureIndex(node, index, playerId))

                nextCapturedPositions.push.apply(nextCapturedPositions, currentCapturePositions)
            }

            // If com is in effect, keep going!
            if (node.rules & RuleSetFlags.Com) {
                capturedPositions = nextCapturedPositions
            } else {
                capturedPositions = []
            }
        }

        // Capture the positions
        for (var rule in node.move.captures) {
            var ruleCaptures = node.move.captures[rule]
            ruleCaptures.forEach(captureLevel =>
                captureLevel.forEach(index =>
                    captureIndex(node, index, playerId)))
        }

        // Type Map
        if (card.type) {
            if (node.rules & RuleSetFlags.Asc) {
                node.bonus[card.type]++
            } else if (node.rules & RuleSetFlags.Des) {
                node.bonus[card.type]--
            }
        }

        // Bump turn number
        node.turn++

        // Zobrist Hash Change
        // TODO

        // SD Rule
        if (node.turn === 9 && node.isSD()) {
            node.move.returns = [
                [0xFF, 0xFF, 0xFF, 0xFF, 0xFF],
                [0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
            ]
            // Cards on board controlled by a player go back to their hand
            var board = node.board
            var boardLen = board.length;
            var playerHandIndexes: [number, number] = [0, 0]

            // TODO: Zobrist hash change while doing this
            for (var boardIndex = 0; boardIndex < boardLen; boardIndex++) {
                playerCard = board[boardIndex]
                var playerId = GetPlayer(playerCard)
                var cardId = GetCardId(playerCard)
                var hand = node.players[playerId].hand
                var handIndex = playerHandIndexes[playerId]
                while (hand[handIndex] !== 0xFF) {
                    handIndex++
                }
                playerHandIndexes[playerId] = handIndex
                node.move.returns[playerId][handIndex] = boardIndex

                // TODO: Zobrist undo board

                hand[handIndex] = cardId

                // TODO: Zobrist do hand
                // Set to 0xFF to denote nothing is there
                board[boardIndex] = 0xFF
            }

            node.turn = 0
            node.firstMove = (node.firstMove+1)%node.players.length
        }

        return node.move
    }
    makeMove(handIndex: number, deckIndex: number, boardIndex: number): GameMove {
        return Game.playCardStatic(this, handIndex, deckIndex, boardIndex)
    }
    applyMove(move: GameMove) {
        var node = this
        
        // Update the player's deck
        ApplyDeckMove(node, move)
        
        var playerId = node.getPlayerId()
        var player = node.players[playerId]
        var otherPlayerId = node.getOtherPlayerId()
        
        // Capture the positions
        for (var rule in node.move.captures) {
            var ruleCaptures = node.move.captures[rule]
            ruleCaptures.forEach(captureLevel =>
                captureLevel.forEach(index =>
                    captureIndex(node, index, playerId)))
        }

        // Bump number of face down cards, if necessary
        if (move.handId === 0) {
            player.numFaceDownCards--
        }
        
        // Type Map
        var card = move.card
        if (card.type) {
            if (node.rules & RuleSetFlags.Asc) {
                node.bonus[card.type]++
            } else if (node.rules & RuleSetFlags.Des) {
                node.bonus[card.type]--
            }
        }
        
        // SD Rule
        if (node.turn == 9 && node.isSD()) {
            // Cards on board controlled by a player go back to their hand
            var board = node.board
            var boardLen = board.length;
            var playerHandIndexes: [number, number] = [0, 0]

            // TODO: Zobrist hash change while doing this
            for (var boardIndex = 0; boardIndex < boardLen; boardIndex++) {
                var playerCard = board[boardIndex]
                var playerId = GetPlayer(playerCard)
                var cardId = GetCardId(playerCard)
                var hand = node.players[playerId].hand
                var handIndex = playerHandIndexes[playerId]
                while (hand[handIndex] !== 0xFF) {
                    handIndex++
                }
                playerHandIndexes[playerId] = handIndex

                // TODO: Zobrist undo board

                hand[handIndex] = cardId

                // TODO: Zobrist do hand
                // Set to 0xFF to denote nothing is there
                board[boardIndex] = 0xFF
            }
            node.turn = 0
        }
    }
    unApplyMove(move: GameMove) {
        var node = this

        // Zobrist Hash Change
        // TODO

        // Drop turn number
        node.turn--

        if (node.turn < 0) {
            // SD Rule
            node.turn = 9
            var returns = move.returns
            var returnsLen = returns.length
            for (var pid = 0; pid < returnsLen; pid++) {
                var p = node.players[pid]
                var rets = returns[pid]
                var hand = p.hand
                var handLen = hand.length
                var board = node.board
                for (var hid = 0; hid < handLen; hid++) {
                    var boardIndex = rets[pid][hid]
                    if (boardIndex === 0xFF) {
                        continue
                    }
                    var playerCard = CreatePlayerCard(hand[hid], pid)
                    board[boardIndex] = playerCard
                    // Zobrist Hash Change
                    // TODO
                }
            }
        }

        // Type Map
        var card = move.card
        if (card.type) {
            if (node.rules & RuleSetFlags.Asc) {
                node.bonus[card.type]--
            } else if (node.rules & RuleSetFlags.Des) {
                node.bonus[card.type]++
            }
        }

        var playerId = node.getPlayerId()
        var player = node.players[playerId]
        var otherPlayerId = node.getOtherPlayerId()

        // Uncapture the positions
        for (var rule in node.move.captures) {
            var ruleCaptures = node.move.captures[rule]
            ruleCaptures.forEach(captureLevel =>
                captureLevel.forEach(index =>
                    captureIndex(node, index, otherPlayerId)))
        }

        // Bump number of face down cards, if necessary
        if (move.handId === 0) {
            player.numFaceDownCards++
        }
        
        // Update the player's deck
        UnApplyDeckMove(node, move)
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

export function getCardTypeBonus(card: GameCard.Card, node: Game) {
    var bonus = 0
    if (card.type
        && (node.rules & (RuleSetFlags.Asc | RuleSetFlags.Des))
        ) {
        bonus = node.bonus[card.type]
    }
    return bonus
}

function getAdjustedValue(card: GameCard.Card, side: number, node: Game) {
    var sideValue = card.sides[side]
    if (card.type && (node.rules & (RuleSetFlags.Asc | RuleSetFlags.Des))) {
        sideValue += getCardTypeBonus(card, node)
        sideValue = Math.max(sideValue, 1)
        sideValue = Math.min(sideValue, 10)
    }

    return sideValue
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
    
    var playerId = GetPlayer(playerCard)
    var cardId = GetCardId(playerCard)

    var x = index % 3
    var y = (index / 3) | 0
    var upIndex = index - 3
    var rightIndex = index + 1
    var downIndex = index + 3
    var leftIndex = index - 1

    var boardIndexes: number[][] = []

    if (y > 0) boardIndexes.push([upIndex, 0])
    if (x < 2) boardIndexes.push([rightIndex, 1])
    if (y < 2) boardIndexes.push([downIndex, 2])
    if (x > 0) boardIndexes.push([leftIndex, 3])

    // filter to only the valid board positions
    var validBoardIndexes = boardIndexes
        .filter(indexes => node.board[indexes[0]] !== 0xFF)

    // Only capture if the card is present and the player is different
    var filterOtherPlayer = (indexes: number[]) => {
        var boardIndex = indexes[0]
        var boardIndexPlayerId = GetPlayer(node.board[boardIndex])
        return boardIndexPlayerId !== playerId
    }
    var filteredBoardIndexes = validBoardIndexes.filter(filterOtherPlayer)

    var card = cardList[cardId]

    // Basic rule
    var basicCaptures: number[] = []

    filteredBoardIndexes.forEach(indexes => {
        var boardIndex = indexes[0]
        var sideIndex = indexes[1]

        // Get the side Index
        var sideCard = node.board[boardIndex]
        var sideCardId = GetCardId(sideCard)
        var otherCard = cardList[sideCardId]

        var sideValue = getAdjustedValue(card, sideIndex, node)

        var otherValue = getAdjustedValue(
            otherCard,
            getOppositeSide(sideIndex),
            node)

        var rev = node.rules & RuleSetFlags.Rev
        if (rev && sideValue < otherValue
            || !rev && sideValue > otherValue) {
            basicCaptures.push(boardIndex)
        }
    })

    if (basicCaptures.length) {
        if (com) {
            capturedIndexes[RuleSetFlags.Com] = basicCaptures
        }
        else {
            var ruleSet = node.rules & ~RuleSetFlags.Com
            capturedIndexes[ruleSet] = basicCaptures
        }
    }

    // Rules.Sam
    // Can use own or opponents cards.
    if (!com && (node.rules & RuleSetFlags.Sam)) {
        var samFilter = (indexes: [number, number]) => {
            var boardIndex = indexes[0]
            var sideIndex = indexes[1]

            var sideCard = node.board[boardIndex]
            var sideCardId = GetCardId(sideCard)
            var otherCard = cardList[sideCardId]

            var sideValue = getAdjustedValue(card, sideIndex, node)

            var otherValue = getAdjustedValue(
                otherCard,
                getOppositeSide(sideIndex),
                node)

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
        // Map each adjacent card to it's sum
        var pluMap = (indexes: [number, number]) => {
            var boardIndex = indexes[0]
            var sideIndex = indexes[1]

            var sideCard = node.board[boardIndex]
            var sideCardId = GetCardId(sideCard)
            var otherCard = cardList[sideCardId]

            var sideValue = getAdjustedValue(card, sideIndex, node)

            var otherValue = getAdjustedValue(
                otherCard,
                getOppositeSide(sideIndex),
                node)

            return sideValue + otherValue
        }

        var pluReducer = (
            accumulator: { [key: number]: number[] },
            value: number,
            index: number) => {
            var accVal = accumulator[value] = accumulator[value] || []
            accVal.push(index)
            return accumulator
        }

        // Get the sum of each pair
        // Get the list of indexes in validBoardIndexes with that sum
        var accumulator: { [key: number]: number[] } = {}
        var pluSides = validBoardIndexes
            .map(pluMap)
            .reduce(pluReducer, accumulator)

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
                .map(index => validBoardIndexes[index])
                .filter(filterOtherPlayer)
            if (pluFilteredSides.length) {
                capturedIndexes[RuleSetFlags.Plu] = pluFilteredSides.map(s => s[0])
            }
        }
    }

    return capturedIndexes
}
