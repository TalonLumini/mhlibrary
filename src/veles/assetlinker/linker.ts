import { removeEmptyInArray } from "../../node_utils/array/mod";

export function assetParser(source: string) {
    const regex = new RegExp("{{ asset[\\s\\S]+?}}", "gm")
    const match = source.match(regex);

    if (match) {
        return match;
    }

    return false;
}

export function assetLinker(asset: string, directory: string, destination: string) {
    const destinationParts = removeEmptyInArray(directory.split(destination).join("").split("/"));
    let path = asset.replace("{{ asset", "").replace("}}", "");

    if (path.charAt(1) == ".") { 
        path = path.substring(2); 
    }

    for (let i = 0; i < destinationParts.length; i++) { 
        path = "../" + path; 
    }

    if (path.charAt(0) == "/") { 
        path = "." + path; 
    }

    if (path.charAt(path.length - 1) == " ") { 
        path = path.substring(0, path.length - 1); 
    }

    return path.split("//").join("/");
}