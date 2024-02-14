export async function json(req, res) {
    const buffers = []

    for await (const chunk of req) { //essenscial quando não conseguimos treabalhar com os dados parcialmente, por exemplo, recebendo um JSON. Já com videos, musicas, textos, podemos fazer uso sem await, pois podemos ir escrevendo de forma parcial
        buffers.push(chunk)
    }
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    res.setHeader("Content-type", "application/json")
}


