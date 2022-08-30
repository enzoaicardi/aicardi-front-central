import { Format } from "../lib/formats.js";
import { ButtonElement } from "./buttons.js";
import { Element, AiElement, GroupElement } from "./elements.js";
import { IconElement } from "./icons.js";



export class EntityElement extends AiElement{

    /**
     * data is the JSON object representation of entity
     * @param {object} data 
     */

    constructor(data){
        super('entity');

        this.labelElement = new EntityLabelElement(data);
        this.openButton = new ButtonElement('Edit', {icon: 'edit'});
        this.emailButton = new ButtonElement('Mail', {icon: 'email'});

        let cityPostcode = Format.cityPostcode(data);

        this.describe([
            this.labelElement,
            new GroupElement('commands'), [
                this.openButton.addStatus('enabled'),
                this.emailButton
            ],
            new Element('div', {class: 'address'}).content(cityPostcode)
        ]);

        // open and mail button should event.stoppropagation to prevent a manual deselection

    }
}

export class EntityLabelElement extends AiElement{

    constructor(data){
        super('entity-label');

        let fullName = Format.fullName(data);

        this.describe([
            new IconElement(data.company ? 'domain' : 'person'),
            new GroupElement('infos'), [
                new Element('h3').content(data.company || fullName),
                data.company ? new Element('p').content(fullName) : null
            ]
        ]);

    }

}