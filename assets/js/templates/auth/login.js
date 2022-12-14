import { Field } from "../../components/form/field.js";
import { Input } from "../../elements/form/input.js";
import { AuthForm } from "./auth.js";

export class LoginForm extends AuthForm{
    constructor(){
        super('Connexion')

        this.fields = {
            email: new Field('email', {...Input.email, require: false}).status('required'),
            password: new Field('password', {...Input.password, fail: 'Mot de passe erroné'}).status('required')
        }

        this.form.describe(Object.values(this.fields))
    }
}