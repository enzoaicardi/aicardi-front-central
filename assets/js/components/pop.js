import { Button } from "../elements/form/button.js";
import { Icon } from "../elements/icon.js";
import { Item } from "./item.js";

export class Pop extends Item{

    constructor(code){

        const pop = Pop.fromCode(code)
        super('pop', Icon[pop.type])
        
        this.listen('click', (event) => event.stopPropagation())
        document.addEventListener('click', ()=> this.out(), {once: true})

        this.class(pop.type)
        this.title.content(pop.message)

        this.code = code
        this.attached = false

        if(pop.abort) {
            this.abort = new Button({content: 'Annuler'}).status('enabled').status('careful').action(() => this.out())
            this.footer.add(this.abort)
        }

        if(pop.continue) {
            this.continue = new Button({content: typeof pop.continue === 'string' ? pop.continue : 'Continuer'}).status('enabled')
            this.footer.add(this.continue)
            this.continue.action((event) => { if(pop.action) pop.action(event); this.out() })
        }

    }

    on(instance){

        if(instance.pop) {
            instance.pop.out()
            if(instance.pop.code === this.code) delete this; return
        }

        this.childOf()
        this.attached = instance
        instance.pop = this
        this.resize()

        return this

    }

    out(){
        if(this.attached) this.attached = this.attached.pop = false
        if(this.element) this.element.remove()
        delete this
    }

    alert(){

        return this
    }

    // placement

    resize(){

        const elem = this.element
        const client = this.attached.get().getBoundingClientRect()

        const coord = {
            top: window.scrollY + client.top,
            left: window.scrollX + client.left,
            width: client.width > 220 ? client.width : 260,
            height: client.height
        }

        elem.style.width = coord.width + 'px'
        
        let tolong = (coord.left + elem.offsetWidth) - window.innerWidth
        tolong = tolong < 0 ? 0 : tolong

        elem.style.setProperty('--left', (client.width / 2 + tolong) + 'px')
        elem.style.left = (coord.left - tolong) + 'px'

        elem.style.top = coord.top - (elem.offsetHeight + 20) + 'px';

        return this
    }

    // static
    
    static fromCode(code){
        return Pop.coderef[code] || Pop.coderef.default
    }

    static coderef = {

        btn_disabled: {
            type: "warn",
            message: "Certains éléments sont manquants ou incomplets"
        },

        default: {
            type: "error",
            message: "Une erreur s'est produite"
        }

    }

}