export interface Iterator<T> {
    getNext: () => T
}

export interface GameNode {
    getMoveIterator: () => Iterator<GameNode>
    value: () => number
    isTerminal: () => boolean
}

export interface GameNodeScore {
    score: Number;
    node: GameNode
}

export interface Options {
    color: number;
    depth: number;
    generateMoves?: (node: GameNode) => Iterator<GameNode>
    heuristic?: (node: GameNode) => number
    isTerminal?: () => boolean
}