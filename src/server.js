//const http = require("http"); //Aplicações HTTP => APIs

import http from "node:http"
import { json } from "./middleware/json.js";
import { routes } from "./middleware/routes.js";

const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.path.test(url) //test retorna pra ver se é válida ou não essa url
    })

    if (route) {
        const routeParams = url.match(route.path) //dá match nessa regex passada com a url que foi requisitada à API; 

        console.log(routeParams.groups)

        return route.handler(req, res)
    } else {
        return res.writeHead(301).end("Você passou uma rota errada")
    }

    return res.writeHead(404).end(req.method + " - " + req.url)
})

server.listen(3333);
//Padrão de importações
//CommonJS => require (pouco usado atualmente)
//ESModules => import/export (bastante utilizado atualmente) (por default, node não suporte este padrão; Temos que colocar dentro do packge.json : "type": "module")