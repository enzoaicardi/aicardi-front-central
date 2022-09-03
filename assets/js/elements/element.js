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

        this.acceptedStatus = ['enabled', 'completed', 'selected', 'required', 'careful', 'loading', 'failed', 'success', 'readonly']
        this.statusList = {}

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

    // element status

    validStatus(name){
        return this.acceptedStatus.indexOf(name) + 1
    }

    hasStatus(name){
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
        this.element.addEventListener(type, fn, options || {passive:true})
    }

    watch(elems, type, fn, options){
        const instances = !Array.isArray(elems) ? [elems] : elems
        instances.forEach(elem => {
            elem.listen(type, event => fn(elem, event), options)
        })
    }

    // element conds

    isRequired(){
        return this.hasStatus('required')
    }

    isCompleted(){
        return this.hasStatus('completed')
    }

    isValid(){
        return !this.isRequired() || (this.isCompleted() && !this.hasStatus('failed'))
    }

}