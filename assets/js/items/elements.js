

export class Element{

    /**
     * Create a DOM Element
     * @param {string} tagName 
     * @param {object} [attributes] 
     */

    constructor(tagName, attributes){

        this.element = document.createElement(tagName);
        this.acceptedStatus = ['enabled', 'completed', 'required', 'careful', 'loading', 'failed', 'success'];

        for(let key in attributes){
            this.element.setAttribute(key, attributes[key]);
        }

    }

    get(){
        return this.element;
    }

    add(element){
        this.element.appendChild(element); return this;
    }

    remove(element){
        this.element.removeChild(element); return this;
    }

    clear(){
        this.html(''); return this;
    }

    html(htmlStr){
        this.element.innerHTML = htmlStr; return this;
    }

    content(content){
        this.element.textContent = content; return this;
    }

    asChild(parent){
        (parent || document.body).appendChild(this.element)
    }

    describe(array){

        function getElement(item){
            if(item instanceof HTMLElement) return item;
            else return item.get();
        }

        function explore(array, parent){

            for(let i=0; i<array.length; i++){

                let item = array[i];
                if(!item) continue;
                if(Array.isArray(item) && i>0) explore(item, getElement(array[i-1]));
                else parent.appendChild(getElement(item));

            }

        }

        explore(array, this.element);

        return this;

    }

    // status

    isValidStatus(status){
        return this.acceptedStatus.indexOf(status) + 1;
    }

    status(name){
        return !this.element.dataset ? false : name ? this.element.dataset[name] : this.element.dataset;
    }

    toggleStatus(name, condition){
        if(condition) this.addStatus(name);
        else this.removeStatus(name);
    }

    addStatus(name){
        if(this.isValidStatus(name)) this.element.setAttribute('data-' + name, true)
    }

    removeStatus(name){
        if(this.isValidStatus(name)) this.element.removeAttribute('data-' + name)
    }

    // events

    listen(eventType, fn, options){
        this.element.addEventListener(eventType, fn, options || {passive:true});
    }

    watch(items, eventType, fn, options){

        const callback = (event) => { fn(items, this, event); }
        const instances = !Array.isArray(items) ? [items] : items;

        instances.forEach(item => {
            item.listen(eventType, callback, options);
        });
 
    }

    watchKeys(items, fn, options){
        this.watch(items, 'keyup', fn, options)
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
     * @param {string} data 
     * @param {object} [attributes] 
     * @param {string} [tagName] 
     */

    constructor(data, attributes, tagName){

        let name;
        let prefix = 'ai-';

        if(Array.isArray(data)) name = data.map((item)=>{ return prefix+item }).join(' ');
        else name = prefix + data;

        super(tagName || 'div', {class: name, ...attributes})

    }

}

export class GroupElement extends AiElement{ 

    /**
     * Create a group Element
     * @param {string} name 
     * @param {object} [attributes] 
     */

    constructor(name, attributes){
        super('group ' + name, attributes)
    }

}