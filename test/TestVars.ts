import Game = require('../lib/Game')
export var TestBoard = [
    [
        null,                      new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 1),
        new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 0), new Game.PlayerCard(1, 1),
        new Game.PlayerCard(1, 0), new Game.PlayerCard(1, 0), new Game.PlayerCard(1, 1)
    ],
    [
        null,                      null,                      new Game.PlayerCard(1, 1),
        null,                      new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 1),
        new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 0), new Game.PlayerCard(1, 1)
    ],
    [
        null,                      null,                      new Game.PlayerCard(1, 1),
        new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 1),
        new Game.PlayerCard(1, 1), new Game.PlayerCard(1, 0), new Game.PlayerCard(1, 1)
    ],
    [
        null,                      new Game.PlayerCard(2, 0), null,
        new Game.PlayerCard(1, 0), null,                      new Game.PlayerCard(1, 1),
        null,                      new Game.PlayerCard(2, 1), null
    ],
    [
        null,                      null,                      null,
        new Game.PlayerCard(1, 0), null,                      new Game.PlayerCard(1, 1),
        null,                      new Game.PlayerCard(2, 1), null
    ],
    [
        null,                      null,                      null,
        new Game.PlayerCard(1, 0), null,                      new Game.PlayerCard(1, 1),
        null,                      null,                      null
    ]
]

export var TestPlayer1 = [
    new Game.Player([1, 10, null, null, null], []),
    new Game.Player([1, 9, 12, null, null], []),
    new Game.Player([1, 12, null, null], []),
    new Game.Player([null, null, 3, 4, 5], []),
    new Game.Player([null, 2, 3, 4, 5], [])
]
export var TestPlayer2 = [
    new Game.Player([null, null, null, null, null], []),
    new Game.Player([1, null, null, null, null], []),
    new Game.Player([null, null, 3, 4, 5], []),
    new Game.Player([null, null, 3, 4, 0], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    new Game.Player([null, 2, 3, 4, 0], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    new Game.Player([1, 2, 3, 4, 0], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
]

export var TestGame = [
    new Game.Game(
        TestBoard[0],
        [TestPlayer1[0], TestPlayer2[0]],
        8,
        0,
        Game.RuleSetFlags.None
        ),
    new Game.Game(
        TestBoard[0],
        [TestPlayer1[1], TestPlayer2[0]],
        8,
        0,
        Game.RuleSetFlags.None
        ),
    new Game.Game(
        TestBoard[1],
        [TestPlayer1[1], TestPlayer2[1]],
        6,
        0,
        Game.RuleSetFlags.None
        ),
    new Game.Game(
        TestBoard[2],
        [TestPlayer1[2], TestPlayer2[1]],
        7,
        1,
        Game.RuleSetFlags.None
        ),
    new Game.Game(
        TestBoard[3],
        [TestPlayer1[3], TestPlayer2[2]],
        4,
        0,
        Game.RuleSetFlags.None
        ),
    new Game.Game(
        TestBoard[4],
        [TestPlayer1[4], TestPlayer2[3]],
        3,
        1,
        Game.RuleSetFlags.None
        ),
    new Game.Game(
        TestBoard[5],
        [TestPlayer1[4], TestPlayer2[4]],
        2,
        0,
        Game.RuleSetFlags.TO | Game.RuleSetFlags.Plu
        )
]