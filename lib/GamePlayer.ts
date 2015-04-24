import Game = require('./Game')

export interface GamePlayer {
    number: number
    name: string
    deck: number[]
    reward: number[]
    win: number
    lose: number
    draw: number
    fee: number
    regionalRules: number
    rules: number
}

export var players: GamePlayer[] = [
    {
        number: 0,
        name: 'VHJpcGxlIFRyaWFkIE1hc3Rlcg==',
        deck: [2, 4, 5, 7, 13],
        reward: [13, 4],
        win: 10,
        lose: null,
        draw: 4,
        fee: 5,
        regionalRules: 0,
        rules: 1
    },
    {
        number: 1,
        name: 'QXVyaWZvcnQgb2YgdGhlIFRocmVlIENsdWJz',
        deck: [12, 24, 27, 33, 35, 37, 38, 43, 51],
        reward: [12, 27],
        win: 50,
        lose: null,
        draw: null,
        fee: 20,
        regionalRules: 0,
        rules: 258
    },
    {
        number: 2,
        name: 'S2luZyBFbG1lciBJSUk=',
        deck: [39, 41, 45, 49, 50, 61, 62],
        reward: [45, 61],
        win: 117,
        lose: 17,
        draw: 46,
        fee: 30,
        regionalRules: 0,
        rules: 8
    },
    {
        number: 3,
        name: 'UnVodHd5ZGEgb2YgdGhlIFRocmVlIEhlYXJ0cw==',
        deck: [45, 47, 50, 56, 57, 58, 59],
        reward: [45, 50],
        win: 59,
        lose: 8,
        draw: null,
        fee: 25,
        regionalRules: 0,
        rules: 2112
    },
    {
        number: 4,
        name: 'Sm9uYXMgb2YgdGhlIFRocmVlIFNwYWRlcw==',
        deck: [11, 15, 20, 23, 26, 3, 4],
        reward: [15, 20],
        win: 22,
        lose: 3,
        draw: 8,
        fee: 10,
        regionalRules: 0,
        rules: 5
    },
    {
        number: 5,
        name: 'R3VodHdpbnQgb2YgdGhlIFRoZWUgRGlhbW9uZHM=',
        deck: [6, 8, 13, 23, 26, 27, 38, 41],
        reward: [13, 27],
        win: 32,
        lose: null,
        draw: null,
        fee: 15,
        regionalRules: 0,
        rules: 10
    },
    {
        number: 6,
        name: 'SGVsbWhhcnQ=',
        deck: [22, 27, 34, 41, 45, 60],
        reward: [22, 34],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 256,
        rules: 2
    },
    {
        number: 7,
        name: 'TWltaWRvYQ==',
        deck: [25, 33, 37, 50, 54],
        reward: [27, 33],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 2048,
        rules: 2
    },
    {
        number: 8,
        name: 'Um93ZW5h',
        deck: [29, 34, 45, 46, 47, 50, 60, 61],
        reward: [34, 60],
        win: 118,
        lose: 17,
        draw: 47,
        fee: 30,
        regionalRules: 0,
        rules: 256
    },
    {
        number: 9,
        name: 'R2VnZXJ1anU=',
        deck: [55, 56, 63, 65, 66],
        reward: [49, 56],
        win: 116,
        lose: 17,
        draw: 60,
        fee: 30,
        regionalRules: 0,
        rules: 6144
    },
    {
        number: 10,
        name: 'Sm9lbGxhdXQ=',
        deck: [15, 26, 27, 33, 38, 42, 50, 59],
        reward: [15, 59],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 4,
        rules: 2
    },
    {
        number: 11,
        name: 'TWVtZXJvb24=',
        deck: [1, 12, 14, 2, 21, 37, 7],
        reward: [14, 37],
        win: 23,
        lose: 3,
        draw: 9,
        fee: 10,
        regionalRules: 4,
        rules: 1
    },
    {
        number: 12,
        name: 'T3VyZGlsaWM=',
        deck: [26, 33, 38, 50, 51, 55],
        reward: [26, 38],
        win: 60,
        lose: 9,
        draw: 24,
        fee: 25,
        regionalRules: 4,
        rules: 512
    },
    {
        number: 13,
        name: 'U2V6dWwgVG90b2xvYw==',
        deck: [33, 38, 45, 47, 51, 58],
        reward: [33, 38, 58],
        win: 52,
        lose: 7,
        draw: 20,
        fee: 25,
        regionalRules: 0,
        rules: 12
    },
    {
        number: 14,
        name: 'SW5kb2xlbnQgSW1wZXJpYWw=',
        deck: [27, 31, 32, 37, 42, 47, 61, 64],
        reward: [31, 32, 47, 64],
        win: 120,
        lose: 18,
        draw: 48,
        fee: 30,
        regionalRules: 0,
        rules: 64
    },
    {
        number: 15,
        name: 'TWFpc2VudGE=',
        deck: [10, 16, 24, 36, 7],
        reward: [12, 16, 8],
        win: 22,
        lose: 3,
        draw: 8,
        fee: 10,
        regionalRules: 128,
        rules: 1
    },
    {
        number: 16,
        name: 'Vm9yc2FpbGUgSGV1bG9peA==',
        deck: [20, 43, 48, 53, 56, 58, 63, 66],
        reward: [48, 53, 66],
        win: 110,
        lose: 16,
        draw: 44,
        fee: 30,
        regionalRules: 0,
        rules: 64
    },
    {
        number: 17,
        name: 'TW90aGVyIE1pb3VubmU=',
        deck: [11, 28, 29, 30, 35, 48],
        reward: [12, 16, 30],
        win: 32,
        lose: 4,
        draw: 12,
        fee: 15,
        regionalRules: 128,
        rules: 2
    },
    {
        number: 18,
        name: 'TWFyY2V0dGU=',
        deck: [42, 47, 52, 53, 57],
        reward: [35, 42],
        win: 60,
        lose: 9,
        draw: 24,
        fee: 25,
        regionalRules: 64,
        rules: 1024
    },
    {
        number: 19,
        name: 'QnVzY2Fycm9u',
        deck: [39, 42, 43, 48, 52, 66],
        reward: [44, 48],
        win: 59,
        lose: 8,
        draw: 23,
        fee: 25,
        regionalRules: 64,
        rules: 512
    },
    {
        number: 20,
        name: 'TGFuZGVuZWw=',
        deck: [13, 32, 40, 41, 52, 61],
        reward: [41, 52],
        win: 53,
        lose: 7,
        draw: 21,
        fee: 25,
        regionalRules: 0,
        rules: 288
    },
    {
        number: 21,
        name: 'RnVmdWx1cGE=',
        deck: [13, 19, 20, 28, 33, 46, 67],
        reward: [46],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 1024,
        rules: 2
    },
    {
        number: 22,
        name: 'Um9nZXI=',
        deck: [13, 15, 26, 5, 6, 9],
        reward: [5, 9],
        win: 22,
        lose: 3,
        draw: 8,
        fee: 10,
        regionalRules: 1024,
        rules: 1
    },
    {
        number: 23,
        name: 'Ridob2JoYXM=',
        deck: [14, 23, 25, 34, 36, 45, 5, 6],
        reward: [36],
        win: 33,
        lose: 4,
        draw: 13,
        fee: 15,
        regionalRules: 1024,
        rules: 2
    },
    {
        number: 24,
        name: 'SGFi',
        deck: [3, 34, 45, 46, 52, 62, 67],
        reward: [45, 46, 62],
        win: 104,
        lose: 15,
        draw: 41,
        fee: 30,
        regionalRules: 0,
        rules: 128
    },
    {
        number: 25,
        name: 'QmFkZXJvbg==',
        deck: [27, 28, 29, 30, 38, 49, 56],
        reward: [29],
        win: 49,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 32,
        rules: 2
    },
    {
        number: 26,
        name: 'V3ltb25k',
        deck: [22, 28, 31, 4, 7, 8],
        reward: [8],
        win: 33,
        lose: null,
        draw: null,
        fee: 15,
        regionalRules: 16,
        rules: 2
    },
    {
        number: 27,
        name: 'U3dpZnQ=',
        deck: [46, 55, 59, 60, 63, 67],
        reward: [40, 59, 67],
        win: 110,
        lose: 16,
        draw: 44,
        fee: 30,
        regionalRules: 0,
        rules: 1024
    },
    {
        number: 28,
        name: 'TW9tb2Rp',
        deck: [10, 13, 29, 30, 36, 46],
        reward: [12, 28],
        win: 33,
        lose: 4,
        draw: 13,
        fee: 15,
        regionalRules: 16,
        rules: 2
    },
    {
        number: 29,
        name: 'Uidhc2hhaHQgUmhpa2k=',
        deck: [24, 30, 41, 49, 50, 54, 58, 65],
        reward: [49, 54, 65],
        win: 110,
        lose: 16,
        draw: 44,
        fee: 30,
        regionalRules: 0,
        rules: 12
    },
    {
        number: 30,
        name: 'VHJhY2h0b3Vt',
        deck: [20, 22, 38, 39, 41, 47, 49],
        reward: [20, 41],
        win: 47,
        lose: 7,
        draw: 18,
        fee: 20,
        regionalRules: 4,
        rules: 2
    },
    {
        number: 31,
        name: 'UGlyYWxuYXV0',
        deck: [24, 30, 35, 38, 44, 48, 56],
        reward: [24, 35],
        win: 50,
        lose: 7,
        draw: 20,
        fee: 20,
        regionalRules: 64,
        rules: 2
    },
    {
        number: 32,
        name: 'VGF0YXJ1IFRhcnU=',
        deck: [19, 33, 45, 49, 50, 62, 80],
        reward: [19, 50, 80],
        win: 165,
        lose: 24,
        draw: 66,
        fee: 35,
        regionalRules: 0,
        rules: 8448
    }
]

players.forEach(player => player.name = atob(player.name))