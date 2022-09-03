import { Field } from "../components/field.js";
import { Valuable } from "../elements/valuable.js";
import { Group } from "./group.js";

export class ValuableGroup extends Group{

    constructor(){
        super('valuables')
    }

    fields(){
        let valuables = []
        function explore(elems){
            elems.forEach(elem => {
                if(elem instanceof Field) valuables.push(elem)
                else if(elem.childs.length) explore(elem.childs)
            })
        }
        explore(this.childs)
        return valuables
    }

}