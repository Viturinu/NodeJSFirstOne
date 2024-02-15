import fs from "node:fs/promises" //usar o promisse pois é mais atual, poderemos utilizar como promisses, não mais como funções de callback como parâmetro

const databasePath = new URL("../db.json", import.meta.url) //__dirname e __dirfile não são mais usados, pois agora o node usa por padrão o esmodule, não mais commonJS (const fs = require("fs")) | poderiamos colocar só o arquivo db.json no primeiro parametro, mas ele ia escrever o arquivo no local onde chamamos nosso servidor npm run dev. Já dessa forma com URL, a gente tem o local onde gostariamos, independnete da chamada do servidor.

export class Database {
    #database = {} //# will be used to transform it into a private property (will only access from the methods outside the class)

    constructor() {
        fs.readFile(databasePath, "utf-8").then(data => {
            this.#database = JSON.parse(data)
        })
            .catch(() => {
                this.#persist()
            })
    }
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist(); //escrita das informações

        return data;
    }
}