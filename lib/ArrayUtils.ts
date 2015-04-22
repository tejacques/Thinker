import Range = require('./Range')

export function min(arr: number[]) {
    var len = arr.length
    var min = Infinity
    for (var i = 0; i < len; i++) {
        if (min > arr[i]) min = arr[i]
    }

    return min
}

export function minProjection<T>(arr: T[], projection: (v: T) => number) {
    var len = arr.length
    var min = Infinity
    var minIndex = -1
    for (var i = 0; i < len; i++) {
        var val = projection(arr[i])
        if (min > val) {
            min = val
            minIndex = i
        }
    }

    return arr[minIndex]
}

export function max(arr: number[]) {
    var len = arr.length
    var max = -Infinity
    for (var i = 0; i < len; i++) {
        if (max < arr[i]) max = arr[i]
    }

    return max
}

export function maxProjection<T>(arr: T[], projection: (v: T) => number) {
    var len = arr.length
    var max = -Infinity
    var maxIndex = -1
    for (var i = 0; i < len; i++) {
        var val = projection(arr[i])
        if (max < val) {
            max = val
            maxIndex = i
        }
    }

    return arr[maxIndex]
}

export function fillArray<T>(filler: T, length: number) {
    var arr: T[] = new Array(length)
    var i = 0
    for (; i < length; i++) {
        arr[i] = filler
    }
    return arr;
}

export function numericSort<T>(
    arr: T[],
    toNumber: (t: T) => number,
    reverse: boolean = false) {
    if (!reverse) {
        return arr.sort((a, b) => toNumber(a) - toNumber(b))
    } else {
        return arr.sort((a, b) => toNumber(b) - toNumber(a))
    }
}