import { Valuable } from "../elements/form/valuable.js";
import { Group } from "./group.js";

export class Form extends Group{

    constructor(){
        super('form')
        this.firstdata = {}
    }

    // instances in main Group class

    data(data){
        if(data){
            this.fields().forEach(field => {
                field.value(data[field.name()] || '')
                field.get().dispatchEvent(new Event('input'))
            })
            this.firstdata = data = this.data()
        }
        else{
            data = {}
            this.fields().forEach(field => data[field.name()] = field.value())
        }
        return data
    }

    isDifferent(){
        const currentdata = this.data()
        return Object.entries(this.firstdata).some(([key, value]) => {
            return typeof currentdata[key] === 'undefined' || currentdata[key] !== value
        })
    }

    submit(){
        // submit the form
    }

}