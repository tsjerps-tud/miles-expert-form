
export function setAt<T>(arr: T[], index: number, newValue: T) {
    return arr.map((v, i) => i == index ? newValue : v)
}

export function reorder(arr: number[], index: number) {
    for (let i = 0; i < arr.length; i++)
        if (!arr.includes(i))
            return setAt(arr, index, i);

    return setAt(Array.from({ length: arr.length }, _ => -1), index, 0);
}
