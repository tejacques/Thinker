import Game = require('./Game')
import Range = require('./Range')
import TT = require('./TranspositionTable')
import IterativeDeepening = require('./IterativeDeepening')
import PrintBoard = require('./PrintBoard')

function PlayGame(
    player1Hand: number[],
    player1Deck: number[],
    player2Hand: number[],
    player2Deck: number[],
    firstMove: boolean,
    rules: Game.RuleSetFlags,
    player1DeckKnown: boolean,
    player2DeckKnown: boolean,
    player1AI: TT.Search,
    player2AI: TT.Search,
    player1Time: number,
    player2Time: number
    ) {

    var player1 = new Game.Player(player1Hand, player1Deck)
    var player2 = new Game.Player(player2Hand, player2Deck)
    var allCardIds = Range(1, 80)
    var closedHand = [0,0,0,0,0]
    var moveOffset = firstMove ? 0 : 1

    var p1Player2 = new Game.Player(
        rules & Game.RuleSetFlags.AO
            ? player2Hand
            : closedHand,
        player2DeckKnown ? player2Deck : allCardIds)
    var p2Player1 = new Game.Player(
        rules & Game.RuleSetFlags.AO
            ? player1Hand
            : closedHand,
        player1DeckKnown ? player1Deck : allCardIds)

    var p1Game = new Game.Game(Game.newBoard(), [player1, p1Player2],
        0,
        moveOffset,
        rules)

    var p2Game = new Game.Game(Game.newBoard(), [p2Player1, player2],
        0,
        moveOffset,
        rules)

    var games = [p1Game, p2Game]
    var AI = [player1AI, player2AI]
    var times = [player1Time, player2Time]
    var breakCondition = node => node.isTerminal()

    for (var i = 0; i < 9; i++) {
        var turn = (i + moveOffset) % 2
        var otherTurn = (turn + 1) % 2
        var node = games[turn]
        var other = games[otherTurn]
        var color = moveOffset === turn ? 1 : -1

        var start = +new Date()
        var next = IterativeDeepening(node, AI[turn], 9, color, times[turn])
        var end = +new Date()
        var elapsed = (end - start)
        var turnReached = next.endNode.originalNode.turn
        var depthSearched = turnReached - node.turn
        var newNode = next.node.originalNode
        var move = newNode.move
        var cardId = games[turn].players[turn].hand[move.handIndex]
        games[turn] = newNode
        var deckIndex = games[otherTurn].players[turn].deck.indexOf(cardId)
        games[otherTurn] = other.playCard(move.handIndex, deckIndex, move.boardIndex)

        console.log()
        console.log()
        console.log('Turn: ' + i)
        console.log('Score for player1: ' + games[turn].value())
        console.log('Expected score: ' + (color * next.score))
        console.log('Time elapsed: ' + elapsed + 'ms')
        console.log('Depth searched: ' + depthSearched)
        console.log('Turn searched to: ' + turnReached)
        PrintBoard(games[turn].board)
    }

    return games
}

export = PlayGame