import { createElement } from "../workspace.js";

export class Element{

    /** generic element
     * @param {string} tag 
     * @param {object} [attributes]
     */

    constructor(tag, attributes, options){

        this.options = options || {};

        this.element = createElement(tag, attributes)
        this.childs = []

        this.acceptedStatus = ['enabled', 'completed', 'selected', 'required', 'failed', 'careful', 'success', 'readonly', 'inactive', 'loading']
        this.statusList = {}

        this.pop = false

    }

    // element get

    get(){
        return this.element
    }

    // element manipulation

    class(cls){
        if(Array.isArray(cls)) cls.forEach(name => this.element.classList.add(name))
        else this.element.classList.add(cls)
        return this
    }
    
    add(element){
        this.element.appendChild(element.get())
        this.childs.push(element)
        return this
    }

    remove(element){
        this.element.removeChild(element.get())
        let index = this.childs.indexOf(element)
        if(index+1) this.childs.splice(index, 1)
        return this
    }

    clear(){
        this.html('')
        this.childs = []
        return this
    }

    content(content){
        this.element.textContent = content
        return this
    }

    childOf(parent){
        (parent || document.body).appendChild(this.element)
    }

    describe(array){

        const that = this
        function explore(array, parent){

            for(let i=0; i<array.length; i++){

                let elem = array[i]; if(!elem) continue

                if(Array.isArray(elem) && i>0) explore(elem, array[i-1])
                else (parent || that).add(elem)

            }

        }
        explore(array)
        return this

    }

    // childs methods

    some(fn){
        return this.childs.some(fn)
    }

    every(fn){
        return this.childs.every(fn)
    }

    instancesOf(instances, deep){

        let results = []
        if(!Array.isArray(instances)) instances = [instances]

        function explore(elems){
            elems.forEach(elem => {
                const cond = instances.some(instance => {return elem instanceof instance})
                if(cond) results.push(elem)
                if(((!cond && !deep) || deep) && elem.childs.length) explore(elem.childs)
            })
        }

        explore(this.childs)
        return results
    }

    // element status

    validStatus(name){
        return this.acceptedStatus.indexOf(name) + 1
    }

    is(name){
        return this.statusList[name] || false
    }

    toggle(cond, name, value){
        if(cond) this.status(name, value)
        else this.status(name, false)
    }

    status(name, value){
        if(this.validStatus(name)) { 
            if(value === false) this.element.removeAttribute('data-' + name)
            else this.element.setAttribute('data-' + name, value || true)
            this.statusList[name] = value === false ? false : (value || true)
        }
        return this
    }

    // events

    listen(type, fn, options){
        const handler = options && options.quiet ? (event)=>{event.stopPropagation(); fn(event)} : fn
        this.element.addEventListener(type, handler, options || {passive:true})
        return this
    }

    watch(elems, type, fn, options){
        const instances = !Array.isArray(elems) ? [elems] : elems
        instances.forEach(elem => {
            elem.listen(type, event => fn(elem, event), options)
        })
        return this
    }

    // element conds

    isRequired(){
        return this.is('required')
    }

    isCompleted(){
        return this.is('completed') && !this.is('failed')
    }

    isCareful(){
        return this.is('careful')
    }

    isSubmitable(){
        return this.is('enabled') && !this.is('success') && !this.is('loading') && !this.is('inactive')
    }

    isValid(){
        return this.is('inactive') || !this.isRequired() && this.isCareful() || this.isCompleted()
    }

}