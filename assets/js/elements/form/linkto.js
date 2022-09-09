import { ElementAi } from "../elementai.js";
import { Icon } from "../icon.js";

export class LinkTo extends ElementAi{

    constructor(href, icon){
        super('link-to', {tag: 'a'})

        this.element.href = href
        this.add(new Icon(icon))
    }

}