import { Field } from "../../components/form/field.js";
import { Input } from "../../elements/form/input.js";
import { AuthForm } from "./auth.js";

export class ForgotForm extends AuthForm{
    constructor(){
        super('Récupération')

        this.form.add(new Field('email', Input.email).status('required'))
    }
}