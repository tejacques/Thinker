import Game = require('../lib/Game')
import GameCard = require('../lib/GameCard')
import ArrayUtils = require('../lib/ArrayUtils')
import Range = require('../lib/Range')


var game = new Game.Game(
    Game.newBoard(),
    [
        new Game.Player(ArrayUtils.fillArray(0, 5), Game.cardIds),
        new Game.Player(ArrayUtils.fillArray(0, 5), Game.cardIds, 0) // NPC Has no rarity restriction
    ],
    0,
    0,
    Game.RuleSetFlags.None
    )

for (var i = 0; i < 1000000; i++) {
    game = game.clone()
}