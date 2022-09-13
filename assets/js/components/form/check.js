import { Element } from "../../elements/element.js";
import { Label } from "../../elements/form/label.js";
import { Valuable } from "../../elements/form/valuable.js";
import { Group } from "../../groups/group.js";

export class Check extends Valuable{

    constructor(name, options){
        super('div', {class: 'ai-check'}, options)

        this.options.name = name
        this.name(name)

        this.add(new Element('div', {class: 'box'}))
        this.add(new Label(this.options))
        
        this.status('completed')
        this.attached = new Group('hidden')

        this.listen('click', () => this.check())
    }

    isCheck(){
        return this.value() && Number(this.value()) > 0
    }

    check(){
        if(this.isCheck()) this.value(0)
        else this.value(1)

        this.attachUpdate()
        return this
    }

    attach(elem){
        if(elem) this.attached = elem
        this.status('inactive')
        this.attachUpdate()
        return this
    }

    attachUpdate(){
        this.attached.toggle(this.isCheck(), 'enabled')
        this.attached.fields().forEach(field => field.toggle(!this.isCheck(), 'inactive'))
        return this
    }

}