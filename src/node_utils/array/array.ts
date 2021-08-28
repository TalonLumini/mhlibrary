export function checkArraySimilarities(arr1: any[], arr2: any[]) {
    return arr2.every((i) => arr1.includes(i));
}

export function compareArray(arr1: any[], arr2: any[]) {
    if (arr1.length == arr2.length && arr1.every((i) => arr2.indexOf(i) >= 0)) {
        return true;
    } else {
        return false;
    }
}

export function addPrefixToArrayItems(arr1: any[], item: any) {
    const arr2: any[] = [];

    for (const i in arr1) {
        arr2.push(item.toString() + arr1[i].toString());
    }
}

export function addSuffixToArrayItems(arr1: any[], item: any) {
    const arr2: any[] = [];

    for (const i in arr1) {
        arr2.push(arr1[i].toString() + item.toString());
    }
}

export function replaceInArray(arr1: any[], index: number, item: any) {
    const i = arr1[index];

    if (i !== -1) {
        arr1[index] = item;
    }

    return arr1;
}

export function arrayIntersects(arr1: any[], arr2: any[]) {
    return arr1.filter((i) => arr2.includes(i));
}

export function arrayDiffs(arr1: any[], arr2: any[]) {
    return arr1.filter((i) => !arr2.includes(i));
}

export function arrayObjectDiffs(
    arr1: any[],
    arr2: any[],
    props: { prop1: any; prop2: any },
) {
    return arr1.filter((item1) =>
        !arr2.some(
            (item2) => (item2[props.prop1] === item1[props.prop1] &&
                item2[props.prop2] === item1[props.prop2]),
        )
    );
}

export function symmetricArrayDiffs(arr1: any[], arr2: any[]) {
    return arr1.filter((i) => !arr2.includes(i)).concat(
        arr2.filter((i) => !arr1.includes(i)),
    );
}

export function findPropInArray(arr1: any[], prop1: any, key1: any) {
    return arr1.find((i) => i[prop1] === key1);
}

export function findInArray(arr1: any[], key1: any) {
    return arr1.find((i) => i === key1);
}

export function filterPropInArray(arr1: any[], prop1: any, key1: any) {
    return arr1.filter((i) => i[prop1] === key1);
}

export function filterInArray(arr1: any[], key1: any) {
    return arr1.filter((i) => i === key1);
}
export function removeEmptyInArray(arr1: any[]) {
    return arr1.filter(function (i) {
        return i != null && i != "" && i != " ";
    });
}

export function removeElementInArray(arr1: any[], val1: string) {
    return arr1.filter((i) => i !== val1);
    // arr1.filter(obj => obj.prop !== val1);
}

export function splitArray(arr1: any[], size: number) {
    const arr2: any[] = [];

    if (size == 0 || size >= arr1.length) return;

    for (let i = 0; i < arr1.length; i += size) {
        arr2.push(arr1.slice(i, i + size));
    }

    return arr2;
}