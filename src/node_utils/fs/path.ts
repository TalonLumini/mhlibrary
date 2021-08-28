import path from "path";

export function findFileName(str: string, extension = false) {
    if (extension) {
        return path.basename(str);
    } else {
        const ext = path.extname(str);
        return path.basename(str, ext);
    }
}

export function findExtName(str: string) {
    return path.extname(str);
}

export function findUriExtName(str: string) {
    let uri = path.extname(str);
  
    if (uri.includes("?")) {
        uri = uri.slice(0, uri.indexOf("?"));
    }
  
    if (uri.includes("%")) {
        uri = uri.slice(0, uri.indexOf("%"));
    }
  
    return uri;
}