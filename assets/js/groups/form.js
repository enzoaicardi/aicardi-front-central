import { Field } from "../components/form/field.js";
import { Valuable } from "../elements/form/valuable.js";
import { Group } from "./group.js";

export class Form extends Group{

    constructor(){
        super('form')
    }

    fields(){
        return this.instancesOf(Field)
        // return array of all form data instances (fields, check, ...)
    }

    submit(){
        // submit the form
    }

}