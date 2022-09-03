import { Element } from "./element.js";

export class ElementAi extends Element{ 

    /** known element
     * @param {string|Array} cls 
     * @param {object} [attributes]
     */

    constructor(cls, attributes, options){

        let prefix = 'ai-'
        
        if(Array.isArray(cls)) cls[0] = prefix + cls[0]
        else cls = prefix + cls
        
        super('div', {...attributes, class: cls}, options)

    }

}