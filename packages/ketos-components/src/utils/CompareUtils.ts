
export function stringOrder(a: string, b: string): number {
    if (a > b) {
        return 1
    }
    if (a < b) {
        return -1
    }
    return 0
}

export function numberOrder(a: number, b: number): number {
    return a - b
}