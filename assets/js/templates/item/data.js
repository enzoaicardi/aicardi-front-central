import { Element } from "../../elements/element.js";
import { ElementAi } from "../../elements/elementai.js";
import { Button } from "../../elements/form/button.js";
import { Form } from "../../groups/form.js";

export class ItemData extends ElementAi{

    constructor(data){
        data = data || {}
        super('item-data')

        this.form = new Form()
        this.confirm = new Button({content: data.button || 'Enregistrer'})
    
        this.describe([
            this.form,
            new Element('footer'), [this.confirm]
        ])

        this.childOf()
    }

}