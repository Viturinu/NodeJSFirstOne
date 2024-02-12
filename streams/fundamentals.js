//process.stdin
//.pipe(process.stdout);

import { Readable, Writable, Transform, Duplex } from "node:stream"

class OneToHundredStream extends Readable {

    index = 1;

    _read() {
        const i = this.index++

        setTimeout(() => { //apenas pra simular um arquivo grande sendo enviado
            if (i > 100) {
                this.push(null);//metodo utilizado para fornecer informações para quem estiver consumindo ela
            } else {
                const buff = Buffer.from(String(i)) //Buffer é a estrutura utilizada pelo NodeJS para fazer streamings
                this.push(buff);//tem que enviar Buffer, assim que node trabalha
            }
        }, 1000)


    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1 //transformando chunks
        callback(null, Buffer.from(String(transformed)))//função em caso de algum erro, mas tambem tem o segundo parametro para executar algo, no caso o buffer
    }
}

class MultiplyByTen extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTen)