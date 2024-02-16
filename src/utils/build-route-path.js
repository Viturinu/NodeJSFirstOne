export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g //Regex propriamente
    const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)"); //substituindo no path todas as expressões desejadas que entram nos parametros acima, por uma string que vai conter outros parâmetros regex (tratando a URI pra pegar a id) no lugar das expressões encontradas (primeiro elemento retorno noa rray dessa regex era o /users/id , o segundo era somente o id; quando colocamos $1, ele retorna o nome da posição 0 desse array :id, e o segundo campo é p id de fato, posição 1 do array)
    console.log(pathWithParams)
    const pathRegex = new RegExp(`^${pathWithParams}`) //aqui ele cria uma nova Regex e retorna, pra podermos validar true ou false e usar a regex (criando a estrutura RegExp temos varias funções de apoio (meu entendimento)) //essa estrutura é parecida com a criada no routeParametersRegex, porem aqui estamos jogando uma uri com a expressão (como no routeParametersRegex) dentro da estrutura fornecida pela JS
    return pathRegex
}