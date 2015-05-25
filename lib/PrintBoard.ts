import chalk = require('chalk')
import game = require('./Game')
import GameCard = require('./GameCard')
type Board = number[]
var cardList = GameCard.cardList

var playerColor = {
    0: chalk.bgBlue.white,
    1: chalk.bgRed.white
}

function printBoard(board: Board) {
    var sidesInRow = [[0], [3, 5, 1], [2], [4]]
    // Each row
    console.log(' ' + Array(9 * 3 + 3).join('_'))
    for (var boardXIndex = 0; boardXIndex < 3; boardXIndex++) {
        // Each Side-Row
        console.log('| ' + Array(3 + 1).join(' _______ ') + ' |')
        for (var s = 0; s < sidesInRow.length; s++) {
            var sr = sidesInRow[s]
            // Each Side
            var p = "| "
            for (var boardYIndex = 0; boardYIndex < 3; boardYIndex++) {
                var pos = board[boardXIndex * 3 + boardYIndex]

                if (!pos) {
                    if (s === 3) {
                        p += "|_______|"
                    } else {
                        p += "|       |"
                    }
                    continue
                }
                for (var c = 0; c < sr.length; c++) {
                    var sv = sr[c]
                    // Each Col
                    var card = cardList[game.GetCardId(pos)]
                    var player = game.GetPlayer(pos)
                    if (sv === card.sides.length) {
                        p += playerColor[player]("|_______|")
                    } else if (sv > card.sides.length) {
                        //p += " " + player + " "
                        p += playerColor[player]("   ")
                    } else {
                        var sideVal = card.sides[sv].toString()
                        if (sideVal === '10') sideVal = 'A'
                        if (sv === 1 || sv === 3) {
                            var start = sv === 1
                                ? " "
                                : "|"
                            var end = sv === 1
                                ? "|"
                                : " "
                            p += playerColor[player](start + chalk.bold(sideVal) + end)
                        } else {
                            p += playerColor[player]("|   " + chalk.bold(sideVal) + "   |")
                        }
                    }
                }
            }

            console.log(p + " |")
        }
    }
    console.log('|' + Array(9 * 3 + 3).join('_') + '|')
}

export = printBoard