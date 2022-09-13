import { Button } from "../../elements/form/button.js";
import { Element } from "../../elements/element.js";
import { ElementAi } from "../../elements/elementai.js";
import { Svg } from "../../elements/svg.js";
import { Title } from "../../elements/title.js";
import { Form } from "../../groups/form.js";
import { Media } from "../../lib/format/medias.js";
import { Valuable } from "../../elements/form/valuable.js";

export class AuthForm extends ElementAi{

    constructor(title){
        super('auth')

        this.form = new Form()
        this.confirm = new Button({content: title, icon: 'key'})

        this.describe([
            new Element('header'), [new Svg(Media.logo('transparency'))],
            new Title(title),
            this.form,
            new Element('footer'), [this.confirm]
        ])

        this.listen('input', () => {
            const cond = Valuable.areValid(this.form.fields())
            this.confirm.toggle(cond, 'enabled')
        })

        this.childOf()
    }

}