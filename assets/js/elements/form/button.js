import { Pop } from "../../components/pop.js";
import { Element } from "../element.js";
import { ElementAi } from "../elementai.js";
import { Icon } from "../icon.js";

export class Button extends ElementAi{

    constructor(options){
        super(['button', 'load-after'], null, options)

        new Element('p').content(this.options.content || '').childOf(this.element)
        if(this.options.icon) new Icon(this.options.icon).childOf(this.element)

        this.submit = ()=>{console.warn('infinite pending...')}

        this.listen('click', (event)=>{ 
            if(this.isSubmitable()){
                this.status('loading')
                this.submit(event)
            }
            else new Pop('btn_disabled').on(this)
        }, {quiet: true})
    }

    action(fn){
        this.submit = fn
        return this
    }

}