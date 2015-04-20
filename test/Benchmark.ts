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