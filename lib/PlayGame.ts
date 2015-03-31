import Game = require('./Game')
import Range = require('./Range')
import TT = require('./TranspositionTable')
import IterativeDeepening = require('./IterativeDeepening')
import PrintBoard = require('./PrintBoard')

function PlayGame(
    player1: Game.Player,
    player2: Game.Player,
    firstMove: boolean,
    rules: Game.RuleSetFlags,
    player1DeckKnown: boolean,
    player2DeckKnown: boolean,
    player1AI: TT.Search,
    player2AI: TT.Search,
    player1Time: number,
    player2Time: number
    ) {

    var allCardIds = Range(1, 80)
    var moveOffset = firstMove ? 0 : 1

    var p1Player2 = new Game.Player(
        player2.hand,
        player2DeckKnown ? player2.deck : allCardIds)
    var p2Player1 = new Game.Player(
        player1.hand,
        player1DeckKnown ? player1.deck : allCardIds)

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

    for (var i = 0; i < 9; i++) {
        var turn = (i + moveOffset) % 2
        var otherTurn = (turn + 1) % 2
        var node = games[turn]
        var other = games[otherTurn]
        var color = moveOffset === turn ? 1 : -1

        var next = IterativeDeepening(node, AI[turn], 9, color, times[turn])
        games[turn] = next.node.originalNode
        var move = games[turn].move
        games[otherTurn] = other.playCard(move.handIndex, null, move.boardIndex)

        console.log('Score for player1: ' + games[turn].value())
        PrintBoard(games[turn].board)
    }

    return games
}

export = PlayGame