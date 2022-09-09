import { Check } from "../../components/form/check.js";
import { Field } from "../../components/form/field.js";
import { Input } from "../../elements/form/input.js";
import { LinkTo } from "../../elements/form/linkto.js";
import { Group } from "../../groups/group.js";
import { Rule } from "../../lib/format/rules.js";
import { ItemData } from "./data.js";

export class EntityData extends ItemData{

    constructor(data){
        super(data)

        this.company = new Group('sub');

        this.form.describe([

            new Group('line'), [
                new Field('firstname', {...Input.name, label: 'Prénom'}),
                new Field('lastname', {...Input.name, label: 'Nom'})
            ],
            new Group('line'), [
                new Field('email', {...Input.email, icon: null}),
                new LinkTo('mailto:email.com', 'email')
            ],
            new Group('line'), [
                new Field('phone', {...Input.tel, icon: null}),
                new LinkTo('mailto:email.com', 'phone_in_talk')
            ],

            new Check('is_company', {label: 'Entreprise'}).attach(this.company),

            this.company, [
                new Field('company', {label: 'Denomination', rule: Rule.username}),
                new Field('siret', Input.siret),
                new Field('iban', Input.iban)
            ],

            new Field('country', {label: 'Pays', placeholder: 'France'}),

            new Group('line'), [
                new Field('city', {label: 'Ville'}),
                new Field('postcode', {label: 'Code Postal', placeholder: '73000', rule: Rule.postcode}),
            ],

            new Field('address', {label: 'Adresse postale'}),
            new Field('address_2', {label: 'Complément d\'adresse'})

        ])
    }

}