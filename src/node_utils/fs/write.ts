import fs from "fs";

export function writeAsText(directory: string, data: string) {
    fs.writeFile(directory, data, (callback) => console.log(callback));
}

export function writeAsJson(directory: string, data: string, spacing: number|string = 0) {
    fs.writeFile(directory, JSON.stringify(data, null, spacing), (callback) => console.log(callback));
}

export function writeAsTextSync(directory: string, data: string) {
    fs.writeFileSync(directory, data);
}

export function writeAsJsonSync(directory: string, data: string, spacing: number|string = 0) {
    fs.writeFileSync(directory, JSON.stringify(data, null, spacing));
}

export function writeFile(directory: string, data: string, spacing: number|string, type = "text") {
    if (type == "json") {
        return writeAsJson(directory, data, spacing);
    }

    return writeAsText(directory, data);
}

export function writeFileSync(directory: string, data: string, spacing: number|string = 0, type = "text") {
    if (type == "json") {
        return writeAsJsonSync(directory, data, spacing);
    }

    return writeAsTextSync(directory, data);
}