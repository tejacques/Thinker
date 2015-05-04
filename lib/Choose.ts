type Cache = { [key: number]: { [key: number]: number } }
var cache: Cache = {}
var memorizationOn = true
function Choose(n: number, k: number): number {
    n = n | 0
    k = k | 0

    if (k > n) {
        return 0
    }

    // Faster to compute lower k
    if (n - k < k) {
        k = n-k
    }

    // Early out case
    if (k === 0) {
        return 1
    }

    // Early out case
    if (n === 0) {
        return 0
    }

    // Memoization check
    if (memorizationOn) {
        var c: { [key: number]: number };
        if ((c = cache[n])) {
            var v: number
            if ((v = cache[n][k]) !== undefined) {
                return v
            }
        }
    }
    var numerator = 1
    var denominator = 1

    for (var i = 1; i <= k; i++) {
        numerator *= n + 1 - i
        denominator *= i
    }

    if (memorizationOn) {
        if (!c) {
            c = cache[n] = {}
        }
    }

    var result = numerator / denominator

    if (memorizationOn) {
        cache[n][k] = result
    }

    return result
}
export = Choose