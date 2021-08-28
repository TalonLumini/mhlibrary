/*import { readJson } from "./node_utils/fs/mod";
import handler from "serve-handler";
import http from "http";

const config = readJson("./serve.json");
const pjson = readJson("./package.json");

const server = http.createServer((request: any, response: any) => {
    return handler(request, response, config["serve"]);
});

server.listen(config["port"], () => {
    console.log(
        `[${pjson["name"].toUpperCase()}] Running at *:${config["port"]}`
    );
});*/