import { Field } from "../../components/field.js";
import { Input } from "../../elements/input.js";
import { Valuable } from "../../elements/valuable.js";
import { AuthForm } from "./auth.js";

export class ChangeForm extends AuthForm{
    constructor(){
        super('Changement')

        this.fields = {
            password: new Field('password', Input.password).status('required'),
            repeat: new Field('repeat', Input.repeat).status('required')
        }

        this.valuables.describe(Object.values(this.fields))

        let fields = [this.fields.password, this.fields.repeat];
        this.watch(fields, 'input', () => Valuable.same(fields))
    }
}