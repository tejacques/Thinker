export function pad(num: number, separator: string, s: any) {
    var str = String(s)
    num = num - str.length
    var padding: string
    if (num > 0) {
        padding = Array(num + 1).join(separator)
    } else {
        padding = ''
    }
    var res = padding + str
    return res
}
