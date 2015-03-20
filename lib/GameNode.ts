export interface GameNode {
    generateMoves?: () => GameNode[]
    value?: () => number
    isTerminal?: () => boolean
}

export interface GameNodeScore {
    score: Number;
    node: GameNode
}

export interface Options {
    color: number;
    depth: number;
    generateMoves?: (node: GameNode) => GameNode[]
    heuristic?: (node: GameNode) => number
    isTerminal?: () => boolean
}