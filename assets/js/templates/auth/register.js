import { Field } from "../../components/form/field.js"
import { Input } from "../../elements/form/input.js"
import { Valuable } from "../../elements/form/valuable.js"
import { AuthForm } from "./auth.js"

export class RegisterForm extends AuthForm{
    constructor(){
        super('Créer un compte')

        this.fields = {
            email: new Field('email', Input.email).status('required'),
            username: new Field('username', Input.username).status('required'),
            password: new Field('password', {...Input.password, require: 'Au minimum 6 caratères dont un chiffre et une majuscule'}).status('required'),
            repeat: new Field('repeat', Input.repeat).status('required')
        }

        this.form.describe(Object.values(this.fields))

        let fields = [this.fields.password, this.fields.repeat];
        this.watch(fields, 'input', () => Valuable.same(fields))
    }
}