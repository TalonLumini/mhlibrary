import fs from "fs";

export function findInDirSync(directory: string, extension: any = null, full = false) {
    const files: any[] = [];

    for (const i of fs.readdirSync(directory)) {
        let fileData: string = i;

        if (full === true) {
            fileData = `${directory}/${i}`;
        }

        if (!extension) {
            files.push(fileData);
        } else {
            if (i.includes(extension)) {
                files.push(fileData);
            }
        }
    }

    return files;
}

export function findRecursivelySync(directory: string, extension: any = null) {
    let results: any[] = [];

    for (const i of fs.readdirSync(directory)) {
        const file = `${directory}/${i}`;
        // const file = path.join(directory, i);
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(findRecursivelySync(file, extension));
        } else {
            if (!extension) {
                results.push(file);
            } else {
                if (i.includes(extension)) {
                    results.push(file);
                }
            }
        }
    }

    return results;
}