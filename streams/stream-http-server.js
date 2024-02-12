import http from "node:http"
import { Transform } from "node:stream"

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1 //transformando chunks
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))//função em caso de algum erro, mas tambem tem o segundo parametro para executar algo, no caso o buffer
    }
}

const server = http.createServer(async (req, res) => { //tudo no node são streams, toda entrada e saida são streams (MUITO IMPORTANTE DE ENTENDER)(REQ É READABLE E RES É WRITABLE)

    const buffers = []
    for await (const chunk of req) { //essenscial quando não conseguimos treabalhar com os dados parcialmente, por exemplo, recebendo um JSON. Já com videos, musicas, textos, podemos fazer uso sem await, pois podemos ir escrevendo de forma parcial
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)
    /*
    return req  //ao inves de criarmos as classes writable e readable como fizemos no fundamentals, estamos utilizando agora o stream req(readable) e res (writable)
        .pipe(new InverseNumberStream())
        .pipe(res);
        */
})

server.listen(3335)