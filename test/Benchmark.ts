import expect = require('expect.js');

import Game = require('../lib/Game')
import GameNode = require('../lib/GameNode')
import testVars = require('./TestVars')
import NegaMax = require('../lib/NegaMax')
import NegaScout = require('../lib/NegaScout')
import IterativeDeepening = require('../lib/IterativeDeepening')
import TT = require('../lib/TranspositionTable')
import printBoard = require('../lib/PrintBoard')
import range = require('../lib/Range')

function time(name: string, fn: () => any) {
    console.time(name)
    fn()
    console.timeEnd(name)
}

function repeat(fn: () => any, times: number) {
    for (var i = 0; i < 100; i++) {
        fn()
    }
}

var testHand = testVars.TestPlayer1[0].hand
//testHand[4] = 70
var testDeck = range(80)

var warmupTimes = 100000
var times = 500000

var filteredDeck: number[]
for (var i = 0; i < warmupTimes; i++) {
    filteredDeck = Game.legalDeckFilterOld(testHand, testDeck)
}
for (var i = 0; i < warmupTimes; i++) {
    filteredDeck = Game.legalDeckFilter(testHand, testDeck)
}

var filteredDeck: number[]
console.time('old')
for (var i = 0; i < times; i++) {
    filteredDeck = Game.legalDeckFilterOld(testHand, testDeck)
}
console.timeEnd('old')

console.time('new')
for (var i = 0; i < times; i++) {
    filteredDeck = Game.legalDeckFilter(testHand, testDeck)
}
console.timeEnd('new')