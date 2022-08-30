import { ButtonElement } from "../items/buttons.js";
import { AiElement, GroupElement } from "../items/elements.js";
import { FieldElement } from "../items/fields.js";
import { TitleElement } from "../items/titles.js";
import { Media } from "../lib/urls.js";


export class ListComponent extends AiElement{

    constructor(title, options){
        options = options || {};

        super('list');

        this.titleElement = new TitleElement(title, Media.logo('whiteDot'));

        this.contentGroup = new GroupElement('content');

        this.addButton = new ButtonElement(options.add || 'Nouveau');
        this.searchElement = new FieldElement('search', 'text', {
            placeholder: options.search || 'Rechercher...'
        });

        this.itemsGroup = new GroupElement('items');
        this.confirmButton = new ButtonElement('Confirmer');
        
        this.describe([
            this.titleElement,
            this.contentGroup, [
                new GroupElement('new'), [this.addButton.addStatus('enabled')],
                this.searchElement,
                this.itemsGroup,
                new GroupElement('footer'), [this.confirmButton]
            ]
        ]);

        this.asChild();

    }

}