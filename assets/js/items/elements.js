import { createElement } from "../workspace.js";


export class Element{

    /**
     * Create a DOM Element
     * @param {string} tag 
     * @param {object} [attributes] 
     */

    constructor(tag, attributes){

        this.element = createElement(tag, attributes);
        this.acceptedStatus = ['enabled', 'completed', 'selected', 'required', 'careful', 'loading', 'failed', 'success'];
        this.statusList = {};
        this.childs = [];

    }

    get(){
        return this.element;
    }

    add(element){
        this.element.appendChild(element.get());
        this.childs.push(element); return this;
    }

    remove(element){
        this.element.removeChild(element.get());
        let index = this.childs.indexOf(element);
        if(index+1) this.childs.splice(index, 1); return this;
    }

    clear(){
        this.html(''); return this;
    }

    html(content, outer){
        if(outer) this.element.outerHTML = content;
        else this.element.innerHTML = content;
        return this;
    }

    content(content){
        this.element.textContent = content; return this;
    }

    asChild(parent){
        (parent || document.body).appendChild(this.element)
    }

    describe(array){

        const that = this;
        function explore(array, parent){

            for(let i=0; i<array.length; i++){

                let item = array[i];
                if(!item) continue;
                if(Array.isArray(item) && i>0) explore(item, array[i-1]);
                else (parent || that).add(item);

            }

        }
        explore(array);
        return this;

    }

    // childs methods

    some(fn){
        return this.childs.some(fn);
    }

    every(fn){
        return this.childs.every(fn);
    }

    // status

    isValidStatus(name){
        return this.acceptedStatus.indexOf(name) + 1;
    }

    status(name){
        return this.statusList[name] || false;
    }

    toggleStatus(condition, name, value){
        if(condition) this.addStatus(name, value);
        else this.removeStatus(name);
    }

    addStatus(name, value){
        value = value || true;
        if(this.isValidStatus(name)) { 
            this.element.setAttribute('data-' + name, value);
            this.statusList[name] = value;
        }
        return this;
    }

    removeStatus(name){
        if(this.isValidStatus(name)) { 
            this.element.removeAttribute('data-' + name);
            this.statusList[name] = false;
        }
        return this;
    }

    // events

    listen(type, fn, options){
        this.element.addEventListener(type, fn, options || {passive:true});
    }

    watch(items, type, fn, options){
        // always prefer listen if you can observe only one parentElement
        const instances = !Array.isArray(items) ? [items] : items;
        instances.forEach(item => {
            item.listen(type, event => {fn(item, event)}, options);
        });
    }

    // conditions

    isRequired(){
        return this.status('required');
    }

    isCompleted(){
        return this.status('completed') && !this.status('failed');
    }

}

export class AiElement extends Element{ 

    /**
     * Create a Ai Element
     * @param {string|Array<string>} names 
     * @param {object} [attributes] 
     */

    constructor(names, attributes){

        let prefix = 'ai-';

        if(Array.isArray(names)) names = names.map((value)=>{ return prefix+value });
        else names = prefix + names;

        super('div', {class: names, ...attributes})

    }

}

export class GroupElement extends AiElement{ 

    /**
     * Create a group Element
     * @param {string} name 
     * @param {object} [attributes] 
     */

    constructor(name, attributes){
        super('group', attributes)
        
        if(Array.isArray(name)) name.forEach((className)=>{this.element.classList.add(className)});
        else this.element.classList.add(name);
    }

}