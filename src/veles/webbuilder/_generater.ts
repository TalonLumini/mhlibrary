import { removeEmptyInArray } from "../../node_utils/array/array";
import { copyDir, ensureRecursiveDirExistsSync, findFileName, findRecursivelySync, readFileSync, writeFileSync } from "../../node_utils/fs/mod";
import marked from "../markdown/marked";

/* Configuration */
const config = readFileSync("./veles.json", "json");
const template = config["template"];
const siteConf = config["config"];
const meta = config["meta"];

/* Site content config */
const content = config["content"];
const assets = config["assets"];
const output = config["output"];
const extension = config["ext"];

/* Template rules */
const BASE_PAGE_RULE = `{{ base }}`;
const META_DATA_RULE = `{{ meta }}`;
const META_TITLE_RULE = `{{ title }}`;
const META_SUBTITLE_RULE = `{{ subtitle }}`;
const META_STATEMENT_RULE = `{{ statement }}`;
const META_DESC_RULE = `{{ description }}`;

export function MATTER_PARSER(source: string) {
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

export function MATTER_KV_PAIR(key: any, prop: string, conf: any) {
    if (key && key[prop]) {
        return key[prop];
    } else if (conf && conf[prop]) {
        return conf[prop];
    } else {
        return "";
    }
}

export function ASSET_PATH_PARSER(source: string) {
    const regex = new RegExp("{{ asset[\\s\\S]+?}}", "gm")
    const match = source.match(regex);

    if (match) {
        return match;
    }

    return false;
}

export function ASSET_PATH_SETTER(asset: string, dir: string) {
    const outDir = removeEmptyInArray(dir.split(output).join("").split("/"));
    let path = asset.replace("{{ asset", "").replace("}}", "");

    if (path.charAt(1) == ".") { path = path.substring(2); }
    for (let i = 0; i < outDir.length; i++) { path = "../" + path; }
    if (path.charAt(0) == "/") { path = "." + path; }
    if (path.charAt(path.length - 1) == " ") { path = path.substring(0, path.length - 1); }

    return path.split("//").join("/");
}

export function BUILD_FILES() {
    const siteConfig = readFileSync(siteConf, "json");
    let templateData = readFileSync(template);

    let META_TITLE = siteConfig["title"];
    let META_SUBTITLE = siteConf["subtitle"];
    let META_STATEMENT = siteConf["statement"];
    let META_DESC = siteConfig["description"];

    for (const i in content) {
        const path = content[i];
        const files = findRecursivelySync(path, extension);

        for (const k in files) {
            let file = readFileSync(files[k]);
            let metaData = readFileSync(meta);
            const matter = MATTER_PARSER(file);

            if (matter) {
                const match = file.match("^---[\\s\\S]+?---");
                if (match) {
                    file = file.split(match).join("");
                }

                META_TITLE = MATTER_KV_PAIR(matter, "title", siteConfig);
                META_SUBTITLE = MATTER_KV_PAIR(matter, "subtitle", siteConfig);
                META_STATEMENT = MATTER_KV_PAIR(matter, "statement", siteConfig);
                META_DESC = MATTER_KV_PAIR(matter, "description", siteConfig);
            }

            const markdown = marked(file);

            let parsed = templateData
                .split(BASE_PAGE_RULE).join(markdown)
                .split(META_DATA_RULE).join(metaData)
                .split(META_TITLE_RULE).join(META_TITLE)
                .split(META_SUBTITLE_RULE).join(META_SUBTITLE)
                .split(META_STATEMENT_RULE).join(META_STATEMENT)
                .split(META_DESC_RULE).join(META_DESC);

            const outPath = files[k].split(path).join(output);
            const outDir = outPath.split(findFileName(files[k], true)).join("");
            const TEMPLATE_ASSETS = ASSET_PATH_PARSER(templateData);
            const META_DATA_ASSETS = ASSET_PATH_PARSER(metaData);

            if (TEMPLATE_ASSETS) {
                for (const i in TEMPLATE_ASSETS) {
                    const newPath = ASSET_PATH_SETTER(TEMPLATE_ASSETS[i], outDir);
                    parsed = parsed.split(TEMPLATE_ASSETS[i]).join(newPath);
                }
            }

            if (META_DATA_ASSETS) {
                for (const i in META_DATA_ASSETS) {
                    const newPath = ASSET_PATH_SETTER(META_DATA_ASSETS[i], outDir);
                    parsed = parsed.split(META_DATA_ASSETS[i]).join(newPath);
                }
            }

            ensureRecursiveDirExistsSync(outDir);
            writeFileSync(outPath.split(extension).join(".html"), parsed);
        }

        for (const k in assets) {
            const copyPath = assets[k].split(path).join(output);

            ensureRecursiveDirExistsSync(output);
            copyDir(assets[k], copyPath);
        }
    }
}