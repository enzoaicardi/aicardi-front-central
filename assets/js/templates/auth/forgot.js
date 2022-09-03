import { Field } from "../../components/field.js";
import { Input } from "../../elements/input.js";
import { AuthForm } from "./auth.js";

export class ForgotForm extends AuthForm{
    constructor(){
        super('Récupération')

        this.valuables.add(new Field('email', Input.email).status('required'))
    }
}