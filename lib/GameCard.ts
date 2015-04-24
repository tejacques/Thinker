export class Card {
    name: string
    number: number
    rarity: number
    sides: number[]
    type: number
    constructor(card?: Card) {
        if (card) {
            this.name = card.name
            this.number = card.number
            this.rarity = card.rarity
            this.sides = card.sides.slice();
            this.type = card.type
        }
    }
}

export var cardList: Card[] = [
    {
        name: 'VW5rbm93bg==',
        number: 0,
        rarity: -1,
        sides: null,
        type: -1
    }, {
        name: 'RG9kbw==',
        number: 1,
        rarity: 1,
        sides: [4, 2, 3, 4],
        type: 0
    }, {
        name: 'VG9uYmVycnk=',
        number: 2,
        rarity: 1,
        sides: [2, 2, 7, 2],
        type: 0
    }, {
        name: 'U2Fib3RlbmRlcg==',
        number: 3,
        rarity: 1,
        sides: [4, 3, 3, 3],
        type: 0
    }, {
        name: 'U3ByaWdnYW4=',
        number: 4,
        rarity: 1,
        sides: [2, 3, 4, 4],
        type: 0
    }, {
        name: 'UHVkZGluZw==',
        number: 5,
        rarity: 1,
        sides: [2, 4, 3, 5],
        type: 0
    }, {
        name: 'Qm9tYg==',
        number: 6,
        rarity: 1,
        sides: [3, 4, 3, 3],
        type: 0
    }, {
        name: 'TWFuZHJhZ29yYQ==',
        number: 7,
        rarity: 1,
        sides: [4, 2, 5, 3],
        type: 0
    }, {
        name: 'Q29ibHlu',
        number: 8,
        rarity: 1,
        sides: [3, 3, 3, 4],
        type: 0
    }, {
        name: 'TW9yYm9s',
        number: 9,
        rarity: 1,
        sides: [5, 2, 5, 2],
        type: 0
    }, {
        name: 'Q29ldXJs',
        number: 10,
        rarity: 1,
        sides: [2, 5, 2, 5],
        type: 0
    }, {
        name: 'QWhyaW1hbg==',
        number: 11,
        rarity: 1,
        sides: [5, 5, 2, 2],
        type: 0
    }, {
        name: 'R29vYmJ1ZQ==',
        number: 12,
        rarity: 1,
        sides: [2, 5, 5, 2],
        type: 0
    }, {
        name: 'Q2hvY29ibw==',
        number: 13,
        rarity: 1,
        sides: [3, 7, 2, 1],
        type: 0
    }, {
        name: 'QW1hbGonYWE=',
        number: 14,
        rarity: 1,
        sides: [1, 4, 7, 1],
        type: 3
    }, {
        name: 'SXhhbA==',
        number: 15,
        rarity: 1,
        sides: [6, 1, 3, 4],
        type: 3
    }, {
        name: 'U3lscGg=',
        number: 16,
        rarity: 1,
        sides: [2, 4, 5, 4],
        type: 3
    }, {
        name: 'S29ib2xk',
        number: 17,
        rarity: 1,
        sides: [2, 2, 4, 6],
        type: 3
    }, {
        name: 'U2FoYWdpbg==',
        number: 18,
        rarity: 1,
        sides: [4, 5, 3, 3],
        type: 3
    }, {
        name: 'VGF0YXJ1IFRhcnU=',
        number: 19,
        rarity: 1,
        sides: [7, 2, 3, 2],
        type: 2
    }, {
        name: 'TW9vZ2xl',
        number: 20,
        rarity: 1,
        sides: [2, 1, 3, 7],
        type: 0
    }, {
        name: 'U2lyZW4=',
        number: 21,
        rarity: 2,
        sides: [3, 6, 7, 2],
        type: 0
    }, {
        name: 'VWx0cm9zICYgVHlwaG9u',
        number: 22,
        rarity: 2,
        sides: [2, 3, 6, 7],
        type: 0
    }, {
        name: 'RGVtb24gV2FsbA==',
        number: 23,
        rarity: 2,
        sides: [6, 7, 2, 3],
        type: 0
    }, {
        name: 'U3VjY3VidXM=',
        number: 24,
        rarity: 2,
        sides: [7, 3, 2, 6],
        type: 0
    }, {
        name: 'Q2hpbWVyYQ==',
        number: 25,
        rarity: 2,
        sides: [7, 7, 2, 2],
        type: 0
    }, {
        name: 'Qmx1ZSBEcmFnb24=',
        number: 26,
        rarity: 2,
        sides: [2, 2, 7, 7],
        type: 0
    }, {
        name: 'U2NhcmZhY2UgQnVnYWFsIEph',
        number: 27,
        rarity: 2,
        sides: [6, 6, 2, 6],
        type: 3
    }, {
        name: 'TW9tb2RpIE1vZGk=',
        number: 28,
        rarity: 2,
        sides: [7, 5, 5, 3],
        type: 0
    }, {
        name: 'QmFkZXJvbiBUZW5maW5nZXJz',
        number: 29,
        rarity: 2,
        sides: [3, 7, 5, 5],
        type: 0
    }, {
        name: 'TW90aGVyIE1pb3VubmU=',
        number: 30,
        rarity: 2,
        sides: [5, 5, 3, 7],
        type: 0
    }, {
        name: 'TGl2aWEgc2FzIEp1bml1cw==',
        number: 31,
        rarity: 2,
        sides: [3, 7, 7, 1],
        type: 4
    }, {
        name: 'UmhpdGFodHluIHNhcyBBcnZpbmE=',
        number: 32,
        rarity: 2,
        sides: [7, 1, 3, 7],
        type: 4
    }, {
        name: 'QmlnZ3MgJiBXZWRnZQ==',
        number: 33,
        rarity: 2,
        sides: [5, 3, 7, 5],
        type: 0
    }, {
        name: 'R2Vyb2x0',
        number: 34,
        rarity: 2,
        sides: [1, 7, 3, 7],
        type: 0
    }, {
        name: 'RnJpeGlv',
        number: 35,
        rarity: 2,
        sides: [6, 2, 6, 6],
        type: 3
    }, {
        name: 'TXV0YW1peCBCdWJibHlwb3Rz',
        number: 36,
        rarity: 2,
        sides: [2, 6, 6, 6],
        type: 3
    }, {
        name: 'TWVtZXJvb24=',
        number: 37,
        rarity: 2,
        sides: [6, 6, 6, 2],
        type: 3
    }, {
        name: 'QmVoZW1vdGg=',
        number: 38,
        rarity: 3,
        sides: [7, 8, 4, 2],
        type: 0
    }, {
        name: 'R2lsZ2FtZXNoICYgRW5raWR1',
        number: 39,
        rarity: 3,
        sides: [8, 3, 7, 3],
        type: 0
    }, {
        name: 'SWZyaXQ=',
        number: 40,
        rarity: 3,
        sides: [7, 1, 6, 7],
        type: 1
    }, {
        name: 'VGl0YW4=',
        number: 41,
        rarity: 3,
        sides: [1, 7, 7, 6],
        type: 1
    }, {
        name: 'R2FydWRh',
        number: 42,
        rarity: 3,
        sides: [7, 6, 1, 7],
        type: 1
    }, {
        name: 'R29vZCBLaW5nIE1vZ2dsZSBNb2cgWElJSQ==',
        number: 43,
        rarity: 3,
        sides: [7, 6, 7, 1],
        type: 1
    }, {
        name: 'UmF5YS1PLVNlbm5hICYgQS1SdWhuLVNlbm5h',
        number: 44,
        rarity: 3,
        sides: [5, 6, 6, 6],
        type: 0
    }, {
        name: 'R29kYmVydCBNYW5kZXJ2aWxsZQ==',
        number: 45,
        rarity: 3,
        sides: [6, 6, 5, 6],
        type: 0
    }, {
        name: 'VGhhbmNyZWQ=',
        number: 46,
        rarity: 3,
        sides: [2, 3, 8, 7],
        type: 2
    }, {
        name: 'TmVybyB0b2wgU2NhZXZh',
        number: 47,
        rarity: 3,
        sides: [4, 1, 8, 7],
        type: 4
    }, {
        name: 'UGFwYWx5bW8gJiBZZGE=',
        number: 48,
        rarity: 3,
        sides: [3, 7, 8, 2],
        type: 2
    }, {
        name: 'WSdzaHRvbGE=',
        number: 49,
        rarity: 3,
        sides: [7, 8, 1, 4],
        type: 2
    }, {
        name: 'VXJpYW5nZXI=',
        number: 50,
        rarity: 3,
        sides: [8, 1, 4, 7],
        type: 2
    }, {
        name: 'VWx0aW1hIFdlYXBvbg==',
        number: 51,
        rarity: 4,
        sides: [7, 8, 9, 1],
        type: 4
    }, {
        name: 'T2Rpbg==',
        number: 52,
        rarity: 4,
        sides: [8, 8, 1, 8],
        type: 1
    }, {
        name: 'UmFtdWg=',
        number: 53,
        rarity: 4,
        sides: [8, 1, 8, 8],
        type: 1
    }, {
        name: 'TGV2aWF0aGFu',
        number: 54,
        rarity: 4,
        sides: [8, 8, 8, 1],
        type: 1
    }, {
        name: 'U2hpdmE=',
        number: 55,
        rarity: 4,
        sides: [1, 8, 8, 8],
        type: 1
    }, {
        name: 'TWluZmlsaWE=',
        number: 56,
        rarity: 4,
        sides: [9, 8, 3, 5],
        type: 2
    }, {
        name: 'TGFoYWJyZWE=',
        number: 57,
        rarity: 4,
        sides: [4, 9, 4, 8],
        type: 0
    }, {
        name: 'Q2lkIEdhcmxvbmQ=',
        number: 58,
        rarity: 4,
        sides: [5, 9, 9, 2],
        type: 0
    }, {
        name: 'QWxwaGluYXVkICYgQWxpc2FpZQ==',
        number: 59,
        rarity: 4,
        sides: [9, 3, 3, 9],
        type: 2
    }, {
        name: 'TG91aXNvaXggTGV2ZWlsbGV1cg==',
        number: 60,
        rarity: 4,
        sides: [9, 4, 9, 3],
        type: 2
    }, {
        name: 'QmFoYW11dA==',
        number: 61,
        rarity: 5,
        sides: [9, 5, 9, 6],
        type: 1
    }, {
        name: 'SGlsZGlicmFuZCAmIE5hc2h1IE1oYWthcmFjY2E=',
        number: 62,
        rarity: 5,
        sides: [1, 8, 10, 8],
        type: 0
    }, {
        name: 'TmFuYW1vIFVsIE5hbW8=',
        number: 63,
        rarity: 5,
        sides: [10, 6, 4, 8],
        type: 0
    }, {
        name: 'R2FpdXMgdmFuIEJhZWxzYXI=',
        number: 64,
        rarity: 5,
        sides: [4, 10, 5, 9],
        type: 4
    }, {
        name: 'TWVybHd5YiBCbG9lZmhpc3d5bg==',
        number: 65,
        rarity: 5,
        sides: [5, 9, 10, 3],
        type: 0
    }, {
        name: 'S2FuLUUtU2VubmE=',
        number: 66,
        rarity: 5,
        sides: [9, 10, 1, 7],
        type: 0
    }, {
        name: 'UmF1YmFobiBBbGR5bm4=',
        number: 67,
        rarity: 5,
        sides: [6, 2, 9, 10],
        type: 0
    }, {
        name: 'V2FycmlvciBvZiBMaWdodA==',
        number: 68,
        rarity: 5,
        sides: [10, 2, 5, 10],
        type: 0
    }, {
        name: 'RmlyaW9u',
        number: 69,
        rarity: 5,
        sides: [10, 5, 10, 1],
        type: 0
    }, {
        name: 'T25pb24gS25pZ2h0',
        number: 70,
        rarity: 5,
        sides: [8, 2, 8, 10],
        type: 0
    }, {
        name: 'Q2VjaWwgSGFydmV5',
        number: 71,
        rarity: 5,
        sides: [4, 10, 4, 10],
        type: 0
    }, {
        name: 'QmFydHogS2xhdXNlcg==',
        number: 72,
        rarity: 5,
        sides: [4, 4, 10, 10],
        type: 0
    }, {
        name: 'VGVycmEgQnJhbmZvcmQ=',
        number: 73,
        rarity: 5,
        sides: [10, 10, 2, 5],
        type: 0
    }, {
        name: 'Q2xvdWQgU3RyaWZl',
        number: 74,
        rarity: 5,
        sides: [9, 3, 9, 8],
        type: 0
    }, {
        name: 'U3F1YWxsIExlb25oYXJ0',
        number: 75,
        rarity: 5,
        sides: [6, 10, 10, 1],
        type: 0
    }, {
        name: 'WmlkYW5lIFRyaWJhbA==',
        number: 76,
        rarity: 5,
        sides: [5, 10, 6, 8],
        type: 0
    }, {
        name: 'VGlkdXM=',
        number: 77,
        rarity: 5,
        sides: [10, 7, 1, 9],
        type: 0
    }, {
        name: 'U2hhbnRvdHRv',
        number: 78,
        rarity: 5,
        sides: [4, 9, 7, 9],
        type: 0
    }, {
        name: 'VmFhbg==',
        number: 79,
        rarity: 5,
        sides: [1, 7, 10, 9],
        type: 0
    }, {
        name: 'TGlnaHRuaW5n',
        number: 80,
        rarity: 5,
        sides: [9, 1, 7, 10],
        type: 0
    }
]

cardList.forEach(card => card.name = atob(card.name))