//process.stdin
//.pipe(process.stdout);

import {Readable} from "node:stream"

class OneToHundredStream extends Readable{

    index = 1;

    _read(){
        const i = this.index++

        setTimeout(()=> {
            if(i>100){
                this.push(null);//metodo utilizado para fornecer informações para quem estiver consumindo ela
            } else{
                const buff = Buffer.from(String(i))
                this.push(buff);
            }
        }, 1000)

        
    }
}

new OneToHundredStream().pipe(process.stdout);