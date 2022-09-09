import { Group } from "../../groups/group.js";
import { ElementAi } from "../../elements/elementai.js";
import { Icon } from "../../elements/icon.js";
import { Input } from "../../elements/form/input.js";
import { Label } from "../../elements/form/label.js";
import { Rule } from "../../lib/format/rules.js";
import { Element } from "../../elements/element.js";

export class Field extends ElementAi{

    constructor(name, options){

        super('field', null, options)
        this.options.name = name

        this.label = new Label(this.options)
        this.input = new Input(this.options)
        this.icon = new Icon(this.options.icon)
        this.rule = this.options.rule || Rule.std

        if(this.options.require) this.require = new Element('p', {class: 'require'}).content(this.options.require)
        if(this.options.fail) this.fail =  new Element('p', {class: 'fail'}).content(this.options.fail)

        this.describe([
            this.label,
            new Group(['input', 'load-after']), [
                this.input,
                this.icon
            ],
            this.require || null,
            this.fail || null
        ])

        this.listen('input', () => {
            this.toggle(this.rule(this.value()), 'completed')
        }, {passive:true});

    }

    value(value) {
        return this.input.value(value)
    }

}