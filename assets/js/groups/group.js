import { Check } from "../components/form/check.js"
import { Field } from "../components/form/field.js"
import { ElementAi } from "../elements/elementai.js"

export class Group extends ElementAi{ 

    /**
     * @param {string|Array} cls
     * @param {object} [attributes] 
     */

    constructor(cls, attributes){

        super('group', attributes)
        this.class(cls)
        this.fieldsList = false

    }

    fields(force){
        this.fieldsList = !this.fieldsList || force ? this.instancesOf([Field, Check]) : this.fieldsList
        return this.fieldsList
    }

}