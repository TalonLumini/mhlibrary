import { removeEmptyInArray } from "../../node_utils/array/mod";

export function matterParser(source: string) {
    const regex = new RegExp("^---[\\s\\S]+?---");
    const match = source.match(regex);

    if (match && match[0]) {
        const matches: any = {};
        const m = removeEmptyInArray(match[0]
            .split("---").join("").split("\r\n"));

        for (const i in m) {
            const kv = m[i].split(":");
            let val = kv[1];

            if (val.charAt(0) == " ") {
                val = val.substring(1);
            }

            matches[kv[0]] = val;
        }

        return matches;
    }

    return false;
}

export function getMatter(key: any, prop: string, conf: any) {
    if (key && key[prop]) {
        return key[prop];
    } else if (conf && conf[prop]) {
        return conf[prop];
    } else {
        return "";
    }
}