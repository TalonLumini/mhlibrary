import fs from "fs";

export function tryReadAsJson(data: string) {
    return JSON.parse(data);
}

export function readAsJson(data: string) {
    return JSON.parse(data);
}

export function readAsText(data: string) {
    return data.toString();
}

export function readFileSync(directory: string, type = "text") {
    const file = fs.readFileSync(directory).toString();

    if (type == "json") {
        return readAsJson(file);
    }
    
    return readAsText(file);
}

export const readFile = readFileSync;