import { Readable } from "node:stream";
import fetch from "node-fetch";

class OneToHundredStream extends Readable {

    index = 1;

    _read() {
        const i = this.index++

        setTimeout(() => { //apenas pra simular um arquivo grande sendo enviado
            if (i > 5) {
                this.push(null);//metodo utilizado para fornecer informações para quem estiver consumindo ela
            } else {
                const buff = Buffer.from(String(i)) //Buffer é a estrutura utilizada pelo NodeJS para fazer streamings
                this.push(buff);//tem que enviar Buffer, assim que node trabalha
            }
        }, 1000)
    }
}

fetch("http://192.168.100.106:3335", {
    method: "POST",
    body: new OneToHundredStream(),
}).then(response => {
    response.text().then(data => console.log(data))
})
/*
try {
    const result = fetch("http://192.168.100.106:3335", {
        method: "POST",
        body: new OneToHundredStream()
    });
    console.log(result.text());
}
catch (error) {
    console.log(result)
}
*/
