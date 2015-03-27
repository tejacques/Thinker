export interface Iterator<T> {
    getNext: () => T
}

interface Node {
    value: () => number
    isTerminal: () => boolean
}

export interface GameNode<T extends GameNode<any>> extends Node {
    getMoveIterator: () => Iterator<GameNode<T>>
    originalNode: T
}

export interface GameNodeScore<T extends GameNode<any>> {
    score: number
    node: GameNode<T>
}

export interface Options {
    color?: number
    depth?: number
    time?: number
}