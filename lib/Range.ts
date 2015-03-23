function range(lowEnd: number, highEnd: number) {
    var c = highEnd - lowEnd + 1,
        arr = new Array(c),
        i = 0;
    for (; i < c; i++) {
        arr[i] = lowEnd++
    }
    return arr;
}

export = range