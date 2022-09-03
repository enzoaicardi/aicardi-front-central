import { ElementAi } from "./elementai.js"

export class Label extends ElementAi{

    constructor(options){
        super('label', {for: options.name})
        this.content(options.label || options.name)
    }
    
}