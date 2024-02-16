import fs from "node:fs/promises" //usar o promisse pois é mais atual, poderemos utilizar como promisses, não mais como funções de callback como parâmetro

const databasePath = new URL("../db.json", import.meta.url) //__dirname e __dirfile não são mais usados, pois agora o node usa por padrão o esmodule, não mais commonJS (const fs = require("fs")) | poderiamos colocar só o arquivo db.json no primeiro parametro, mas ele ia escrever o arquivo no local onde chamamos nosso servidor npm run dev. Já dessa forma com URL, a gente tem o local onde gostariamos, independnete da chamada do servidor.

export class Database {
    #database = {} //# will be used to transform it into a private property (will be only accessed from the methods inside the class, therefore we need to call those methods from the instance of this class)

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

    select(table, search) {
        let data = this.#database[table] ?? [] //let pois será alterado este valor

        if (search) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase)
                })
            })
        }

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

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1) //splice é a funcão na estrutura de Array para apagar(emendar confome tradução), a depender do segundo parâmetro, uma, duas ou mais linhas do Array;
            this.#persist();
        }
    }
    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data } //splice é a funcão na estrutura de Array para apagar(emendar confome tradução), a depender do segundo parâmetro, uma, duas ou mais linhas do Array;
            this.#persist();
        }
    }
}