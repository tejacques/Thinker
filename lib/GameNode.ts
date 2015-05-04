export interface Iterator<T> {
    getNext: () => T
}

export interface Node<T extends Node<any>> {
    value: () => number
    isTerminal: () => boolean
    originalNode: T
}

export interface GameNode<T extends GameNode<any>> extends Node<T> {
    getMoveIterator: () => Iterator<GameNode<T>>
    //originalNode: T
}

export interface PDGameNode<T extends PDGameNode<any>> extends Node<T> {
    getDeterministicMoves: () => PDGameNode<T>[]
    getProbabilisticMoves: () => PDGameNode<T>[]
    pBestMove(rank: number, numMoves: number): number
}

export interface GameNodeScoreBase<T> {
    score: number
    node: T
}

export interface GameNodeScore<T extends GameNode<any>>
    extends GameNodeScoreBase<GameNode<T>> {
    score: number
    endNode: GameNode<T>
}

export interface PDGameNodeScore<T extends PDGameNode<any>>
    extends GameNodeScoreBase<PDGameNode<T>> {
    score: number
}

export interface Options {
    color?: number
    depth?: number
    time?: number
}