import { readFileSync } from "../../node_utils/fs/mod";
import { getMatter } from "../frontmatter/parser";

const config = readFileSync("./veles.json", "json");
const site = readFileSync(config["config"], "json");

export const BASE_PAGE_RULE = `{{ base }}`;
export const META_DATA_RULE = `{{ meta }}`;
export const META_TITLE_RULE = `{{ title }}`;
export const META_SUBTITLE_RULE = `{{ subtitle }}`;
export const META_THEME_COLOR_RULE = `{{ theme-color }}`;
export const META_STATEMENT_RULE = `{{ statement }}`;
export const META_DESC_RULE = `{{ description }}`;

export let META_TITLE = site["title"];
export let META_SUBTITLE = site["subtitle"];
export let META_THEME_COLOR = site["theme-color"]
export let META_STATEMENT = site["statement"];
export let META_DESC = site["description"];

export function setMatter(matter: any) {
    META_TITLE = getMatter(matter, "title", site);
    META_SUBTITLE = getMatter(matter, "subtitle", site);
    META_THEME_COLOR = getMatter(matter, "theme-color", site);
    META_STATEMENT = getMatter(matter, "statement", site);
    META_DESC = getMatter(matter, "description", site);
}

export function buildWithMatter(str: string) {
    return str.split(META_TITLE_RULE).join(META_TITLE)
        .split(META_SUBTITLE_RULE).join(META_SUBTITLE)
        .split(META_THEME_COLOR_RULE).join(META_THEME_COLOR)
        .split(META_STATEMENT_RULE).join(META_STATEMENT)
        .split(META_DESC_RULE).join(META_DESC);
}