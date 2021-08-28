import { copyDir, ensureRecursiveDirExistsSync, findFileName, findRecursivelySync, readFileSync, writeFileSync } from "../../node_utils/fs/mod";
import { assetLinker, assetParser } from "../assetlinker/linker";
import { BASE_PAGE_RULE, META_DATA_RULE, buildWithMatter } from "./rules";
import { matterParser } from "../frontmatter/parser";
import md from "../markdown/marked";
import { setMatter } from "./rules";

const config = readFileSync("./veles.json", "json");
const template = readFileSync(config["template"]);
const meta = config["meta"];
const content = config["content"];
const assets = config["assets"];
const extension = config["ext"];
const output = config["output"];

export function builder() {
    for (const i in content) {
        const path = content[i];
        const files = findRecursivelySync(path, extension);

        for (const k in files) {
            let file = readFileSync(files[k]);
            const metaData = readFileSync(meta);
            const matter = matterParser(file);

            if (matter) {
                const match = file.match("^---[\\s\\S]+?---");
                if (match) { file = file.split(match).join(""); }
                setMatter(matter);
            }

            const markdown = md(file);
            let parsed = template.split(BASE_PAGE_RULE).join(markdown).split(META_DATA_RULE).join(metaData)
            parsed = buildWithMatter(parsed);

            const outPath = files[k].split(path).join(output);
            const outDir = outPath.split(findFileName(files[k], true)).join("");
            const TEMPLATE_ASSETS = assetParser(template);
            const META_DATA_ASSETS = assetParser(metaData);

            if (TEMPLATE_ASSETS) {
                for (const i in TEMPLATE_ASSETS) {
                    const newPath = assetLinker(TEMPLATE_ASSETS[i], outDir, output);
                    parsed = parsed.split(TEMPLATE_ASSETS[i]).join(newPath);
                }
            }

            if (META_DATA_ASSETS) {
                for (const i in META_DATA_ASSETS) {
                    const newPath = assetLinker(META_DATA_ASSETS[i], outDir, output);
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