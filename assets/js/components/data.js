import { ButtonElement } from "../items/buttons.js";
import { CheckBox } from "../items/checks.js";
import { AiElement, Element, GroupElement } from "../items/elements.js";
import { FieldElement, FieldSet, FieldsGroupElement } from "../items/fields.js";
import { Rule } from "../lib/rules.js";


export class DataComponent extends AiElement{

    constructor(){
        super('data');

        this.data = new GroupElement('content')
        this.saveButton = new ButtonElement('Enregistrer')
        this.footerGroup = new GroupElement('footer')

        this.describe([
            this.data,
            this.footerGroup, [this.saveButton]
        ]);

        this.asChild()
    }

}

export class BusinessData extends DataComponent{

    constructor(data){
        super();
        
        this.nameFields = new FieldsGroupElement('line').build({
            firstname: {label: 'Prénom', rule: Rule.name, value: data.firstname},
            lastname: {label: 'Nom', rule: Rule.name},
        })

        this.emailField = new FieldsGroupElement('command').build({email: FieldSet.email}).add(
            new ButtonElement('', {link: 'mailto:mail@mail.com', size: 'small', icon: 'forward_to_inbox'}).addStatus('enabled')
        )

        this.telField = new FieldsGroupElement('command').build({tel: FieldSet.tel}).add(
            new ButtonElement('', {link: 'tel:0102030405', size: 'small', icon: 'phone_in_talk'}).addStatus('enabled')
        )

        this.companyCheck = new CheckBox('Entreprise', 'full');
        this.companyCheck.listen('click', ()=>{this.companyCheck.toggle()})

        this.companyFields = new FieldsGroupElement('subdata').build({
            company: {label: 'Dénomination'},
            siret: FieldSet.siret,
            iban: FieldSet.iban
        });

        this.countryField = new FieldElement('country', 'text', {
            label: 'Pays',
            placeholder: 'France'
        });

        this.cityFields = new FieldsGroupElement('line').build({
            city: {label: 'Ville', rule: Rule.name},
            postcode: {label: 'Code Postal', rule: Rule.postcode},
        })

        this.addressFields = new FieldsGroupElement('col').build({
            address: {label: 'Adresse'},
            address_2: {label: 'Complément d\'adresse'},
        })

        this.data.describe([
            this.nameFields,
            this.emailField,
            this.telField,
            this.companyCheck,
            this.companyFields,
            this.countryField,
            this.cityFields,
            this.addressFields
        ]);
    }

}