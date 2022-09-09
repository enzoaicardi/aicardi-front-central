import { Element } from "../../elements/element.js";
import { Label } from "../../elements/form/label.js";
import { Valuable } from "../../elements/form/valuable.js";

export class Check extends Valuable{

    constructor(name, options){
        super('div', {class: 'ai-check'}, options)
        this.options.name = name
        this.name(name)

        this.add(new Element('div', {class: 'box'}))
        this.add(new Label(this.options))
        this.attached = new Element('div')

        this.listen('click', ()=>{
            if(this.value() > 0) this.uncheck()
            else this.check()
        })
    }

    check(){
        this.value(1)
        this.attached.status('enabled')
        return this
    }

    uncheck(){
        this.value(0)
        this.attached.status('enabled', false)
        return this
    }

    attach(elem){
        this.attached = elem
        return this
    }

}