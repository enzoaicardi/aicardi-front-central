import { ButtonElement } from "../items/buttons.js";
import { AiElement, Element, GroupElement } from "../items/elements.js";
import { HeaderLogoElement } from "../items/headers.js";
import { FieldElement, FieldsGroupElement } from "../items/inputs.js";
import { TitleElement } from "../items/titles.js";
import { Rule } from "../lib/rules.js";

export function setUpAuth(){

    let login = new LoginComponent;
    let register = new RegisterComponent;

}

class AuthComponent extends AiElement{

    constructor(title){
        super('auth')

        this.headerElement = new HeaderLogoElement();
        this.titleElement = new TitleElement(title);
        this.fieldsGroup = new FieldsGroupElement();
        this.footerGroup = new GroupElement('footer');
        this.buttonElement = new ButtonElement(title, {icon: 'key'});

        this.describe([
            this.headerElement,
            this.titleElement,
            this.fieldsGroup,
            this.footerGroup, [
                this.buttonElement
            ]
        ]);
    }

}

class LoginComponent extends AuthComponent{

    constructor(){
        super('Connexion');

        this.fieldsGroup.build({
            email: {
                type: 'email',
                icon: 'email',
                label: 'Adresse Email',
                rule: Rule.email,
                required: true
            },
            password: {
                type: 'password',
                icon: 'lock',
                label: 'Mot de passe',
                rule: Rule.password,
                required: true
            }
        });

        this.asChild();
    }

}

class RegisterComponent extends AuthComponent{

    constructor(){
        super('Créer un compte');

        this.fieldsGroup.build({
            email: {
                type: 'email',
                icon: 'email',
                label: 'Adresse Email',
                rule: Rule.email,
                required: true
            },
            username: {
                type: 'text',
                icon: 'person',
                label: 'Nom d\'utilisateur',
                rule: Rule.username,
                required: true
            },
            password: {
                type: 'password',
                icon: 'lock',
                label: 'Mot de passe',
                rule: Rule.password,
                required: true
            },
            repeat: {
                type: 'password',
                icon: 'lock',
                label: 'Répéter mot de passe',
                rule: Rule.password,
                required: true
            }
        });

        this.asChild();
    }

}