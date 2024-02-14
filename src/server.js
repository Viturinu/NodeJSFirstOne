//const http = require("http"); //Aplicações HTTP => APIs

import http from "node:http"
import { json } from "./middleware/json.js";

const users = [];

const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    await json(req, res);

    if (method === "GET" && url === "/users") {
        return res.
            writeHead(201).end(JSON.stringify(users));
    }
    if (method === "POST" & url === "/users") {

        const { name, email } = req.body;

        users.push({
            name,
            email
        })

        console.log(users)
        return res.writeHead(201).end()

    }


    return res.writeHead(404).end(req.method + " - " + req.url)
})

server.listen(3333);
//Padrão de importações
//CommonJS => require (pouco usado atualmente)
//ESModules => import/export (bastante utilizado atualmente) (por default, node não suporte este padrão; Temos que colocar dentro do packge.json : "type": "module")