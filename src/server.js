//const http = require("http"); //Aplicações HTTP => APIs

import http from "node:http"

const server = http.createServer(async (req, res) => {
    const users = [];
    const { method, url } = req;

    const buffers = []
    for await (const chunk of req) { //essenscial quando não conseguimos treabalhar com os dados parcialmente, por exemplo, recebendo um JSON. Já com videos, musicas, textos, podemos fazer uso sem await, pois podemos ir escrevendo de forma parcial
        buffers.push(chunk)
    }

    const body = JSON.parse(Buffer.concat(buffers).toString())

    console.log(body.name)

    if (method === "GET" && url === "/users") {
        return res.
            setHeader("content-type", "application/json").
            end(JSON.stringify(users));
    }
    if (method === "POST" & url === "/users") {
        users.push({
            id: 1,
            name: "Victor",
            email: "victor.almeida.ti@gmail.com"
        });
        return res.writeHead(201).end();
    }


    return res.writeHead(404).end(req.method + " - " + req.url)
})

server.listen(3333);
//Padrão de importações
//CommonJS => require (pouco usado atualmente)
//ESModules => import/export (bastante utilizado atualmente) (por default, node não suporte este padrão; Temos que colocar dentro do packge.json : "type": "module")