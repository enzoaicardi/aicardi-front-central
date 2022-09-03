import { Path } from "./paths.js";

const logosAi = {
    transparency: 'aicardi.pro-transparency.svg',
    whiteDot: 'aicardi.pro-white-dot.svg'
}

export class Media{

    static logo(name){
        return Path.images('logos/' + (logosAi[name] || name))
    }
    
}