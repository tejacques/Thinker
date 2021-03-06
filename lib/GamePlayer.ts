﻿import Game = require('./Game')

export interface GamePlayer {
    number: number
    name: string
    hand?: number[]
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
        rules: 4
    }, {
        number: 1,
        name: 'QXVyaWZvcnQgb2YgdGhlIFRocmVlIENsdWJz',
        deck: [12, 24, 27, 33, 35, 37, 38, 43, 51],
        reward: [12, 27],
        win: 50,
        lose: null,
        draw: null,
        fee: 20,
        regionalRules: 0,
        rules: 136
    }, {
        number: 2,
        name: 'S2luZyBFbG1lciBJSUk=',
        hand: [61, 50, 45, 0, 0],
        deck: [39, 41, 45, 49, 50, 61, 62],
        reward: [45, 61],
        win: 117,
        lose: 17,
        draw: 46,
        fee: 30,
        regionalRules: 0,
        rules: 64
    }, {
        number: 3,
        name: 'UnVodHd5ZGEgb2YgdGhlIFRocmVlIEhlYXJ0cw==',
        deck: [45, 47, 50, 56, 57, 58, 59],
        reward: [45, 50],
        win: 59,
        lose: 8,
        draw: null,
        fee: 25,
        regionalRules: 0,
        rules: 4128
    }, {
        number: 4,
        name: 'Sm9uYXMgb2YgdGhlIFRocmVlIFNwYWRlcw==',
        deck: [11, 15, 20, 23, 26, 3, 4],
        reward: [15, 20],
        win: 22,
        lose: 3,
        draw: 8,
        fee: 10,
        regionalRules: 0,
        rules: 20
    }, {
        number: 5,
        name: 'R3VodHdpbnQgb2YgdGhlIFRoZWUgRGlhbW9uZHM=',
        deck: [6, 8, 13, 23, 26, 27, 38, 41],
        reward: [13, 27],
        win: 32,
        lose: null,
        draw: null,
        fee: 15,
        regionalRules: 0,
        rules: 72
    }, {
        number: 6,
        name: 'SGVsbWhhcnQ=',
        deck: [22, 27, 34, 41, 45, 60],
        reward: [22, 34],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 128,
        rules: 8
    }, {
        number: 7,
        name: 'TWltaWRvYQ==',
        deck: [25, 33, 37, 50, 54],
        reward: [27, 33],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 32,
        rules: 8
    }, {
        number: 8,
        name: 'Um93ZW5h',
        hand: [34, 61, 0, 0, 0],
        deck: [29, 34, 39, 45, 47, 50, 60, 61],
        reward: [34, 60],
        win: 118,
        lose: 17,
        draw: 47,
        fee: 30,
        regionalRules: 0,
        rules: 128
    }, {
        number: 9,
        name: 'R2VnZXJ1anU=',
        deck: [31, 55, 56, 63, 65, 66],
        reward: [49, 56],
        win: 116,
        lose: 17,
        draw: 60,
        fee: 30,
        regionalRules: 0,
        rules: 16416
    }, {
        number: 10,
        name: 'Sm9lbGxhdXQ=',
        deck: [15, 26, 27, 33, 38, 42, 50, 59],
        reward: [15, 59],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 16,
        rules: 8
    }, {
        number: 11,
        name: 'TWVtZXJvb24=',
        deck: [1, 12, 14, 2, 21, 37, 7],
        reward: [14, 37],
        win: 23,
        lose: 3,
        draw: 9,
        fee: 10,
        regionalRules: 16,
        rules: 4
    }, {
        number: 12,
        name: 'T3VyZGlsaWM=',
        hand: [55, 51, 50, 0, 0, 0],
        deck: [26, 33, 38, 44, 50, 51, 55],
        reward: [26, 38],
        win: 60,
        lose: 9,
        draw: 24,
        fee: 25,
        regionalRules: 16,
        rules: 256
    }, {
        number: 13,
        name: 'U2V6dWwgVG90b2xvYw==',
        deck: [33, 38, 45, 47, 51, 58],
        reward: [33, 38, 58],
        win: 52,
        lose: 7,
        draw: 20,
        fee: 25,
        regionalRules: 0,
        rules: 80
    }, {
        number: 14,
        name: 'SW5kb2xlbnQgSW1wZXJpYWw=',
        deck: [27, 31, 32, 37, 42, 47, 61, 64],
        reward: [31, 32, 47, 64],
        win: 120,
        lose: 18,
        draw: 48,
        fee: 30,
        regionalRules: 0,
        rules: 4096
    }, {
        number: 15,
        name: 'TWFpc2VudGE=',
        deck: [10, 16, 24, 36, 7],
        reward: [12, 16, 8],
        win: 22,
        lose: 3,
        draw: 8,
        fee: 10,
        regionalRules: 8192,
        rules: 4
    }, {
        number: 16,
        name: 'Vm9yc2FpbGUgSGV1bG9peA==',
        deck: [20, 43, 48, 53, 56, 58, 63, 66],
        reward: [48, 53, 66],
        win: 110,
        lose: 16,
        draw: 44,
        fee: 30,
        regionalRules: 0,
        rules: 4096
    }, {
        number: 17,
        name: 'TW90aGVyIE1pb3VubmU=',
        hand: [30, 29, 15, 0, 0],
        deck: [5, 11, 12, 15, 28, 29, 30, 35, 48],
        reward: [12, 16, 30],
        win: 32,
        lose: 4,
        draw: 12,
        fee: 15,
        regionalRules: 8192,
        rules: 8
    }, {
        number: 18,
        name: 'TWFyY2V0dGU=',
        deck: [42, 47, 52, 53, 57],
        reward: [35, 42],
        win: 60,
        lose: 9,
        draw: 24,
        fee: 25,
        regionalRules: 4096,
        rules: 512
    }, {
        number: 19,
        name: 'QnVzY2Fycm9u',
        hand: [66, 52, 43, 0, 0],
        deck: [39, 42, 43, 44, 48, 52, 66],
        reward: [44, 48],
        win: 59,
        lose: 8,
        draw: 23,
        fee: 25,
        regionalRules: 4096,
        rules: 256
    }, {
        number: 20,
        name: 'TGFuZGVuZWw=',
        hand: [52, 41, 0, 0, 0],
        deck: [13, 32, 34, 40, 41, 52, 61],
        reward: [41, 52],
        win: 53,
        lose: 7,
        draw: 21,
        fee: 25,
        regionalRules: 0,
        rules: 2176
    }, {
        number: 21,
        name: 'RnVmdWx1cGE=',
        hand: [33, 28, 2, 0, 0],
        deck: [2, 13, 19, 20, 28, 33, 46, 67],
        reward: [46],
        win: 48,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 512,
        rules: 8
    }, {
        number: 22,
        name: 'Um9nZXI=',
        hand: [26, 9, 13, 0, 0],
        deck: [13, 15, 26, 5, 6, 9, 25],
        reward: [5, 9],
        win: 22,
        lose: 3,
        draw: 8,
        fee: 10,
        regionalRules: 512,
        rules: 4
    }, {
        number: 23,
        name: 'Ridob2JoYXM=',
        hand: [45, 36, 14, 0, 0],
        deck: [14, 23, 25, 34, 36, 45, 5, 6, 13, 18],
        reward: [36],
        win: 33,
        lose: 4,
        draw: 13,
        fee: 15,
        regionalRules: 512,
        rules: 8
    }, {
        number: 24,
        name: 'SGFi',
        hand: [62, 45, 0,0,0],
        deck: [3, 34, 45, 46, 52, 62, 67],
        reward: [45, 46, 62],
        win: 104,
        lose: 15,
        draw: 41,
        fee: 30,
        regionalRules: 0,
        rules: 8192
    }, {
        number: 25,
        name: 'QmFkZXJvbg==',
        deck: [27, 28, 29, 30, 38, 49, 56],
        reward: [29],
        win: 49,
        lose: 7,
        draw: 19,
        fee: 20,
        regionalRules: 2048,
        rules: 8
    }, {
        number: 26,
        name: 'V3ltb25k',
        deck: [22, 28, 31, 4, 7, 8],
        reward: [8],
        win: 33,
        lose: null,
        draw: null,
        fee: 15,
        regionalRules: 1024,
        rules: 8
    }, {
        number: 27,
        name: 'U3dpZnQ=',
        deck: [46, 55, 59, 60, 63, 67],
        reward: [40, 59, 67],
        win: 110,
        lose: 16,
        draw: 44,
        fee: 30,
        regionalRules: 0,
        rules: 512
    }, {
        number: 28,
        name: 'TW9tb2Rp',
        deck: [10, 13, 29, 30, 36, 46],
        reward: [12, 28],
        win: 33,
        lose: 4,
        draw: 13,
        fee: 15,
        regionalRules: 1024,
        rules: 8
    }, {
        number: 29,
        name: 'Uidhc2hhaHQgUmhpa2k=',
        hand: [65, 54, 41, 0, 0],
        deck: [24, 30, 38, 41, 49, 50, 54, 58, 65],
        reward: [49, 54, 65],
        win: 110,
        lose: 16,
        draw: 44,
        fee: 30,
        regionalRules: 0,
        rules: 80
    }, {
        number: 30,
        name: 'VHJhY2h0b3Vt',
        deck: [20, 22, 38, 39, 41, 47, 49],
        reward: [20, 41],
        win: 47,
        lose: 7,
        draw: 18,
        fee: 20,
        regionalRules: 16,
        rules: 8
    }, {
        number: 31,
        name: 'UGlyYWxuYXV0',
        deck: [24, 30, 35, 38, 44, 48, 56],
        reward: [24, 35],
        win: 50,
        lose: 7,
        draw: 20,
        fee: 20,
        regionalRules: 4096,
        rules: 8
    }, {
        number: 32,
        name: 'VGF0YXJ1IFRhcnU=',
        hand: [50, 19, 80, 0, 0],
        deck: [19, 33, 45, 48, 49, 50, 62, 80],
        reward: [19, 50, 80],
        win: 165,
        lose: 24,
        draw: 66,
        fee: 35,
        regionalRules: 0,
        rules: 130
    }
]

players.forEach(player => player.name = atob(player.name))