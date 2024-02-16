//?search=Diego&page=2

export function extractQueryParams(query) {
    return query.substr(1).split("&").reduce((queryParams, param) => {
        const [key, value] = param.split("=") //desestruturando array (param.split retorna um array, logo já colocamos ele em key, value (desestruturação do mesmo jeito)) e quebrando o array já splitado
        queryParams[key] = value
        return queryParams
    }, {}) //pra matar o primeiro caracter (?)
}