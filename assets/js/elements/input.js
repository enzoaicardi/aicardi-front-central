import { Rule } from "../lib/format/rules.js";
import { Valuable } from "./valuable.js";

export class Input extends Valuable{

    constructor(options){

        const placeholders = {
            email: 'adresse@email.com',
            password: '**************',
            search: 'Recherchez...',
            tel: '06 05 04 03 02'
        };

        const attributes = {
            name: options.name,
            type: options.type || 'text',
            placeholder: options.placeholder || placeholders[options.type] || options.label || 'Ecrire...'
        }

        super('input', attributes, options)

        this.value(options.value || '')

    }

    // static types

    static password = {
        label: 'Mot de passe',
        type: 'password',
        icon: 'lock',
        require: 'Au minimum 6 caratères dont un chiffre et une majuscule',
        rule: Rule.password
    }

    static repeat = {
        label: 'Répétez mot de passe',
        type: 'password',
        icon: 'lock',
        rule: Rule.password,
        fail: 'Les mots de passe doivent correspondre'
    }

    static email = {
        label: 'Adresse Email',
        fail: "Cet email ne correspond à aucun compte",
        type: 'email',
        icon: 'email',
        rule: Rule.email
    }

    static tel = {
        label: 'Téléphone',
        type: 'tel',
        icon: 'phone',
        rule: Rule.tel
    }

    static username = {
        icon: 'person',
        label: "Nom d'utilisateur",
        rule: Rule.username,
        required: true
    }

    static siret = {
        label: 'Siret',
        placeholder: '784 671 695 00103',
        rule: Rule.siret
    }

    static iban = {
        label: 'IBAN',
        placeholder: 'FR14 2001 0101 1505 0001 3M02 606',
        rule: Rule.iban
    }


}