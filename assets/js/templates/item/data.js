import { Element } from "../../elements/element.js";
import { ElementAi } from "../../elements/elementai.js";
import { Button } from "../../elements/form/button.js";
import { Form } from "../../groups/form.js";

export class ItemData extends ElementAi{

    constructor(options){
        super('item-data', null, options)

        this.form = new Form()
        this.confirm = new Button({content: this.options.button || 'Enregistrer'})
    
        this.describe([
            this.form,
            new Element('footer'), [this.confirm]
        ])

        this.form.listen('input', () => this.confirm.toggle(this.isDifferent(), 'enabled'))

        this.childOf()
    }

    data(data){
        return this.form.data(data)
    }

    isDifferent(){
        return this.form.isDifferent()
    }

}