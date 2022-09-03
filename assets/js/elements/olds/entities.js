import { Format } from "../lib/formats.js";
import { ButtonElement } from "./buttons.js";
import { Element, AiElement, GroupElement } from "./elements.js";
import { IconElement } from "./icons.js";



export class EntityElement extends AiElement{

    /**
     * data is the JSON object representation of entity
     * @param {object} data 
     */

    constructor(label){
        super('entity');

        this.labelElement = label || null;
        this.editGroup = new GroupElement('edit');

        this.describe([
            this.editGroup, [new IconElement('content_paste_go')],
            this.labelElement
        ]);

        // editGroup button should event.stoppropagation to prevent a manual deselection

    }
}

export class BusinessEntity extends EntityElement{
    constructor(data){
        super(new BusinessEntityLabel(data));
    }
}

export class TaskEntity extends EntityElement{
    constructor(data){
        super(new TaskEntityLabel(data));
    }
}

export class EntityLabelElement extends Element{

    constructor(className){
        super('div', {class: ['label', className]});

        this.title = new GroupElement('title');
        this.subtitle = new GroupElement('subtitle');

        this.describe([
            this.title,
            this.subtitle
        ]);

    }

}

export class BusinessEntityLabel extends EntityLabelElement{

    constructor(data){
        super('business');

        let fullName = Format.fullName(data);
        let cityPostcode = Format.cityPostcode(data);

        this.title.describe([
            new Element('h3', {class: 'name'}).content(data.company || fullName),
            data.company ? new Element('p', {class: 'subname'}).content(fullName) : null
        ]);

        this.subtitle.describe([
            new Element('div', {class: 'address'}).content(cityPostcode)
        ]);

    }

}

export class TaskEntityLabel extends EntityLabelElement{

    constructor(data){
        super('task');

        this.title.add(new Element('h3', {class: 'name'}).content(data.title));

        this.subtitle.describe([
            new GroupElement('prices'), [
                data.static_price ? new Element('div', {class: ['price', 'static']}).content(data.static_price + ' €') : null,
                data.dynamic_price ? new Element('div', {class: ['price', 'dynamic'], dataset: {time: data.time || 'heure'}}).content(data.dynamic_price + ' €') : null
            ],
            data.icon ? new IconElement(data.icon) : null
        ]);

    }

}