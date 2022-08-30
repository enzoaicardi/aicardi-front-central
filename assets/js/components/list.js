import { ButtonElement } from "../items/buttons.js";
import { AiElement, GroupElement } from "../items/elements.js";
import { EntityElement } from "../items/entities.js";
import { FieldElement } from "../items/fields.js";
import { TitleElement } from "../items/titles.js";
import { Media } from "../lib/urls.js";


export class ListComponent extends AiElement{

    constructor(title, options){

        options = options || {};

        super('list');

        this.choices = options.choices;
        this.readOnly = options.readOnly;
        
        this.titleElement = new TitleElement(title, Media.logo('whiteDot'));
        this.contentGroup = new GroupElement('content');
        this.addButton = new ButtonElement(options.add || 'Nouveau');
        this.searchElement = new FieldElement('search', 'text', {
            placeholder: options.search || 'Rechercher...',
            icon: 'search'
        });
        this.itemsGroup = new GroupElement('items');
        this.confirmButton = new ButtonElement('Confirmer');
        
        this.describe([
            this.titleElement,
            this.contentGroup, [
                new GroupElement('new'), [this.addButton.addStatus('enabled')],
                this.searchElement,
                this.itemsGroup, [
                    new EntityElement({firstname: 'jack', city: 'Tence', postcode: '43190'})
                ],
                new GroupElement('footer'), [this.confirmButton.addStatus('loading')]
            ]
        ]);

        this.itemsGroup.watch(this.itemsGroup.childs, 'click', (item)=>{
            if(!this.choices) this.itemsGroup.childs.forEach((child)=>{ if(child !== item) child.removeStatus('selected') });
            item.toggleStatus(!item.status('selected'), 'selected', this.readOnly ? 'readonly' : null)
        });

        this.itemsGroup.listen('click', ()=>{
            const condition = this.itemsGroup.some((item)=>{return item.status('selected')})
            this.confirmButton.toggleStatus(condition, 'enabled')
        });

        this.asChild();

    }

}