import Game = require('./Game')
import BitStringGenerator = require('./BitStringGenerator')

class ZobristHash{
    low: number
    high: number
    static mask = ((1 << 22) - 1)
    lowBits: number[][]
    highBits: number[][]
    generator: BitStringGenerator = new BitStringGenerator()
    constructor() {
        this.lowBits = new Array(256)
        this.highBits = new Array(256)
        for (var i = 0; i < 256; i++) {
            this.lowBits[i] = new Array(81)
            this.highBits[i] = new Array(81)
            for (var j = 0; j < 81; j++) {
                this.lowBits[i][j] = this.generator.next(32)
                this.highBits[i][j] = this.generator.next(32)
            }
        }

        this.low = this.generator.next(32)
        this.low = this.generator.next(32)
    }
    hash(node: Game.Game) {

        var bitIndex = 0

        // Board
        var boardLen = node.board.length
        for (var boardIndex = 0;
            boardIndex < boardLen;
            boardIndex++ , bitIndex++) {
            var playerCard = node.board[boardIndex]
            if (playerCard) {
                this.low ^= this.lowBits[bitIndex][playerCard.card]
            }
        }

        // Player Hands
        for (var playerId = 0;
            playerId < node.players.length;
            playerId++ , bitIndex++) {
            var player = node.players[playerId]
            var hand = player.hand
            var handLen = hand.length
            for (var handIndex = 0; handIndex < handLen; handIndex++) {
                var handId = hand[handIndex]
                if (handId !== null) {
                    this.low ^= hand[handIndex]
                }
            }
        }

        // Player Decks
    }
}

export = ZobristHash