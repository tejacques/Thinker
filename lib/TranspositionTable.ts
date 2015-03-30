import LRU = require('lru-cache')
import GameNode = require('./GameNode')

var cache = LRU(50000)

export enum Flag {
    Exact,
    Upperbound,
    Lowerbound,
}

export interface Entry<T> {
    depth: number
    flag: Flag
    node: T
    endNode: T
    value: number
}

export class TranspositionTable<T extends GameNode.GameNode<any>> {
    private cache: LRU.Cache<Entry<T>>
    constructor(max) {
        this.cache = LRU<Entry<T>>(max)
    }
    get(node: T): Entry<T> {
        return this.cache.get(node.toString())
    } 
    set(entry: Entry<T>) {
        return this.cache.set(entry.node.toString(), entry)
    }
}