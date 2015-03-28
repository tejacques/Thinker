import game = require('../lib/Game')
export var TestBoard = [
    [
        null,                      new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 0), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1)
    ],
    [
        null,                      null,                      new game.PlayerCard(1, 1),
        null,                      new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1)
    ],
    [
        null,                      null,                      new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 1), new game.PlayerCard(1, 1), new game.PlayerCard(1, 1),
        new game.PlayerCard(1, 1), new game.PlayerCard(1, 0), new game.PlayerCard(1, 1)
    ],
    [
        null,                      new game.PlayerCard(2, 0), null,
        new game.PlayerCard(1, 0), null,                      new game.PlayerCard(1, 1),
        null,                      new game.PlayerCard(2, 1), null
    ],
    [
        null,                      null,                      null,
        new game.PlayerCard(1, 0), null,                      new game.PlayerCard(1, 1),
        null,                      new game.PlayerCard(2, 1), null
    ],
    [
        null,                      null,                      null,
        new game.PlayerCard(1, 0), null,                      new game.PlayerCard(1, 1),
        null,                      null,                      null
    ]
]

export var TestPlayer1 = [
    new game.Player([1, 10, null, null, null], []),
    new game.Player([1, 9, 12, null, null], []),
    new game.Player([1, 12, null, null], []),
    new game.Player([null, null, 3, 4, 5], []),
    new game.Player([null, 2, 3, 4, 5], [])
]
export var TestPlayer2 = [
    new game.Player([null, null, null, null, null], []),
    new game.Player([1, null, null, null, null], []),
    new game.Player([null, null, 3, 4, 5], []),
    new game.Player([null, null, 3, 4, 0], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    new game.Player([null, 2, 3, 4, 0], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    new game.Player([1, 2, 3, 4, 0], [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
]

export var TestGame = [
    new game.Game(
        TestBoard[0],
        [TestPlayer1[0], TestPlayer2[0]],
        8,
        0,
        game.RuleSetFlags.None
        ),
    new game.Game(
        TestBoard[0],
        [TestPlayer1[1], TestPlayer2[0]],
        8,
        0,
        game.RuleSetFlags.None
        ),
    new game.Game(
        TestBoard[1],
        [TestPlayer1[1], TestPlayer2[1]],
        6,
        0,
        game.RuleSetFlags.None
        ),
    new game.Game(
        TestBoard[2],
        [TestPlayer1[2], TestPlayer2[1]],
        7,
        1,
        game.RuleSetFlags.None
        ),
    new game.Game(
        TestBoard[3],
        [TestPlayer1[3], TestPlayer2[2]],
        4,
        0,
        game.RuleSetFlags.None
        ),
    new game.Game(
        TestBoard[4],
        [TestPlayer1[4], TestPlayer2[3]],
        3,
        1,
        game.RuleSetFlags.None
        ),
    new game.Game(
        TestBoard[5],
        [TestPlayer1[4], TestPlayer2[4]],
        2,
        0,
        game.RuleSetFlags.None
        )
]