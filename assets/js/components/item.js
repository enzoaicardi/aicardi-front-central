import { Element } from "../elements/element.js";
import { ElementAi } from "../elements/elementai.js";
import { Icon } from "../elements/icon.js";
import { Group } from "../groups/group.js";

export class Item extends ElementAi{
    constructor(name, icon){
        super(['item', name])

        this.header = new Element('header')
        this.icon = icon ? new Icon(icon) : null
        this.main = new Group('content')
        this.title = new Element('div', {class: 'title'})
        this.details = new Element('div', {class: 'details'})
        this.footer = new Element('footer')

        this.describe([
            this.header,
            new Group('main'), [
                this.icon,
                new Element('div', {class: 'spliter'}),
                this.main, [
                    this.title,
                    this.details
                ]
            ],
            this.footer
        ])
    }
}