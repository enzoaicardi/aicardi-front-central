import { Button } from "../../elements/button.js";
import { Element } from "../../elements/element.js";
import { ElementAi } from "../../elements/elementai.js";
import { Svg } from "../../elements/svg.js";
import { Title } from "../../elements/title.js";
import { ValuableGroup } from "../../groups/valuables.js";
import { Media } from "../../lib/format/medias.js";

export class AuthForm extends ElementAi{

    constructor(title){
        super('auth')

        this.valuables = new ValuableGroup()
        this.confirm = new Button({content: title, icon: 'key'})

        this.describe([
            new Element('header'), [new Svg(Media.logo('transparency'))],
            new Title(title),
            this.valuables,
            new Element('footer'), [this.confirm]
        ])

        this.listen('input', () => {
            const cond = this.valuables.fields().some(elem => {return !elem.isValid()})
            this.confirm.toggle(!cond, 'enabled')
        })

        this.childOf()
    }

}