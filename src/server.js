//const http = require("http"); //Aplicações HTTP => APIs

import http from "node:http"
import { json } from "./middleware/json.js";
import { routes } from "./middleware/routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {

    const { method, url } = req;
    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.path.test(url) //test retorna pra ver se é válida ou não essa url de acordo com a REGEX (até as rotas que não tem parametros são validas por conta do REGEX criado)
    })

    if (route) {
        const routeParams = url.match(route.path) //dá match nessa regex passada com a url que foi requisitada à API; retorna o array (iterator) com grupo - valor | gruo - valor | ... ; 

        const { query, ...params } = routeParams.groups //pega a query de uma regex e os parametros de rota da outra regex, todas da mesma função (build-route-path)

        //req.params = { ...routeParams.groups } //passando os parametros pro req.params | fizemos com operador rest porque ele estava retornando um array  de Object, foi apenas para tirar essas informações
        req.params = params //coloca todos os parametros dentro de uma propriedade da Req, chamada params também (novidade!)
        req.query = query ? extractQueryParams(query) : {} //coloca toda query dentro de uma propriedade da Req, chamada query também (novidade!)

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