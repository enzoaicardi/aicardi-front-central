import { ButtonElement } from "../items/buttons.js";
import { AiElement, GroupElement } from "../items/elements.js";
import { HeaderLogoElement } from "../items/headers.js";
import { FieldElement, FieldSet, FieldsGroupElement } from "../items/fields.js";
import { TitleElement } from "../items/titles.js";
import { Rule } from "../lib/rules.js";


class AuthComponent extends AiElement{

    constructor(title){
        super('auth')

        this.headerElement = new HeaderLogoElement();
        this.titleElement = new TitleElement(title);
        this.fieldsGroup = new FieldsGroupElement();
        this.footerGroup = new GroupElement('footer');
        this.confirmButton = new ButtonElement(title, {icon: 'key'});

        this.describe([
            this.headerElement,
            this.titleElement,
            this.fieldsGroup,
            this.footerGroup, [
                this.confirmButton
            ]
        ]);

        this.asChild();
        this.listen('input', ()=>{ this.confirmButton.toggleStatus(FieldElement.areValid(this.fieldsGroup.childs), 'enabled');});
        
    }

    matchPass(){
        const pass = this.fieldsGroup.field('password');
        const repeat = this.fieldsGroup.field('repeat');
        
        pass.requirements.new('password');
        FieldElement.sameValue([pass, repeat], 'NO_MATCH_REPEAT_PASS');
    }

}

export class LoginComponent extends AuthComponent{

    constructor(){
        super('Connexion');

        this.fieldsGroup.build({
            email: FieldSet.email,
            password: FieldSet.password
        });
    }

}

export class RegisterComponent extends AuthComponent{

    constructor(){
        super('Créer un compte');

        this.fieldsGroup.build({
            email: FieldSet.email,
            username: {
                type: 'text',
                icon: 'person',
                label: 'Nom d\'utilisateur',
                rule: Rule.username,
                required: true
            },
            password: FieldSet.password,
            repeat: FieldSet.repeat
        });

        this.matchPass();

    }

}

export class ForgotPassComponent extends AuthComponent{

    constructor(){
        super('Récupération')

        this.fieldsGroup.build({
            email: {
                type: 'email',
                icon: 'email',
                label: 'Adresse de récupération',
                rule: Rule.email,
                required: true
            }

        });

    }

}

export class ChangePassComponent extends AuthComponent{

    constructor(){
        super('Changement')

        this.fieldsGroup.build({
            password: FieldSet.password,
            repeat: FieldSet.repeat
        });

        this.matchPass();
    }

}