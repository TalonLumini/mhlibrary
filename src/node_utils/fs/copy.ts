import fs from "fs";
import path from "path";

export function copyFile(source: string, destination: string) {
    fs.copyFile(source, destination, (callback) => console.log(callback));
}

export function copyFileSync(source: string, destination: string) {
    fs.copyFileSync(source, destination);
}

export async function copyDir(source: string, destination: string) {
    await fs.promises.mkdir(destination, { recursive: true });
    const entries = await fs.promises.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destinationPath = path.join(destination, entry.name);

        entry.isDirectory() ?
            await copyDir(sourcePath, destinationPath) :
            await fs.promises.copyFile(sourcePath, destinationPath);
    }
}