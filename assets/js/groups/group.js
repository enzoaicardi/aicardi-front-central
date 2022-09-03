import { ElementAi } from "../elements/elementai.js"

export class Group extends ElementAi{ 

    /**
     * @param {string|Array} cls
     * @param {object} [attributes] 
     */

    constructor(cls, attributes){

        super('group', attributes)
        this.class(cls)

    }

}