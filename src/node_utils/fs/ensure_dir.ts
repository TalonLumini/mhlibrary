import fs from "fs";

export function ensureDirExists(directory: string) {
    fs.mkdir(directory, (error) => {
        if (error) throw error;
    })
}

export function ensureDirExistsSync(directory: string) {
    fs.mkdirSync(directory);
}

export function ensureRecursiveDirExists(directory: string) {
    fs.promises.mkdir(directory, { recursive: true }).catch((error) => {
        console.error("caught exception: ", error.message);
    });
}

export function ensureRecursiveDirExistsSync(directory: string) {
    fs.mkdirSync(directory, { recursive: true });
}