import Game = require('./Game')

var players: { deck: number[]; regionalRules: number[]; rules: number[]}[] = [
    {
        deck: [13, 2, 4, 5, 7],
        regionalRules: [],
        rules: [1]
    },
    {
        deck: [38, 33, 35, 12, 43, 27, 24, 51],
        regionalRules: [],
        rules: [64, 256]
    },
    {
        deck: [39, 41, 45, 49, 50, 61, 62],
        regionalRules: [],
        rules: [8]
    },
    {
        deck: [45, 47, 50, 56, 57, 58, 59],
        regionalRules: [],
        rules: [64, 2048]
    },
    {
        deck: [11, 15, 20, 23, 26, 3, 4],
        regionalRules: [],
        rules: [1, 4]
    },
    {
        deck: [38, 26, 13, 8, 23, 27, 41],
        regionalRules: [],
        rules: [64, 8]
    },
    {
        deck: [22, 27, 34, 41, 45, 60],
        regionalRules: [256],
        rules: [64]
    },
    {
        deck: [25, 33, 37, 50, 54],
        regionalRules: [2048],
        rules: [64]
    },
    {
        deck: [29, 34, 45, 46, 47, 50, 60, 61],
        regionalRules: [],
        rules: [256]
    },
    {
        deck: [55, 56, 63, 65, 66],
        regionalRules: [],
        rules: [4096, 2048]
    },
    {
        deck: [15, 26, 27, 33, 38, 42, 50, 59],
        regionalRules: [4],
        rules: [64]
    },
    {
        deck: [1, 12, 14, 2, 21, 37, 7],
        regionalRules: [4],
        rules: [1]
    },
    {
        deck: [26, 33, 38, 50, 51, 55],
        regionalRules: [4],
        rules: [512]
    },
    {
        deck: [33, 38, 45, 47, 51, 58],
        regionalRules: [],
        rules: [4, 8]
    },
    {
        deck: [27, 31, 32, 37, 42, 47, 61, 64],
        regionalRules: [],
        rules: [64]
    },
    {
        deck: [10, 16, 24, 36, 7],
        regionalRules: [128],
        rules: [1]
    },
    {
        deck: [20, 43, 48, 53, 56, 58, 63, 66],
        regionalRules: [],
        rules: [64]
    },
    {
        deck: [11, 28, 29, 30, 35, 48],
        regionalRules: [128],
        rules: [64]
    },
    {
        deck: [42, 47, 52, 53, 57],
        regionalRules: [64],
        rules: [1024]
    },
    {
        deck: [39, 42, 43, 48, 52, 66],
        regionalRules: [64],
        rules: [512]
    },
    {
        deck: [13, 32, 40, 41, 52, 61],
        regionalRules: [],
        rules: [32, 256]
    },
    {
        deck: [13, 19, 20, 28, 33, 46, 67],
        regionalRules: [1024],
        rules: [64]
    },
    {
        deck: [13, 15, 26, 5, 6, 9],
        regionalRules: [1024],
        rules: [1]
    },
    {
        deck: [14, 23, 25, 34, 36, 45, 5, 6],
        regionalRules: [1024],
        rules: [64]
    },
    {
        deck: [3, 34, 45, 46, 52, 62, 67],
        regionalRules: [],
        rules: [128]
    },
    {
        deck: [27, 28, 29, 30, 38, 49, 56],
        regionalRules: [32],
        rules: [64]
    },
    {
        deck: [22, 28, 31, 4, 7, 8],
        regionalRules: [16],
        rules: [64]
    },
    {
        deck: [46, 55, 59, 60, 63, 67],
        regionalRules: [],
        rules: [1024]
    },
    {
        deck: [10, 13, 29, 30, 36, 46],
        regionalRules: [16],
        rules: [64]
    },
    {
        deck: [24, 30, 41, 49, 50, 54, 58, 65],
        regionalRules: [],
        rules: [4, 8]
    },
    {
        deck: [20, 22, 38, 39, 41, 47, 49],
        regionalRules: [4],
        rules: [64]
    },
    {
        deck: [24, 30, 35, 38, 44, 48, 56],
        regionalRules: [64],
        rules: [64]
    }
]

export = players