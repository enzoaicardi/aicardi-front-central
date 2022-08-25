

export class Element{

    /**
     * Create a DOM Element
     * @param {string} tagName 
     * @param {object} [attributes] 
     */

    constructor(tagName, attributes){

        this.element = document.createElement(tagName);
        this.acceptedStatus = ['enabled', 'completed', 'careful', 'loading', 'failed', 'success'];

        for(let key in attributes){
            this.element.setAttribute(key, attributes[key]);
        }

    }

    get(){
        return this.element;
    }

    add(element){
        this.element.appendChild(element);
    }

    remove(element){
        this.element.removeChild(element);
    }

    clear(){
        this.html('');
    }

    html(htmlStr){
        this.element.innerHTML = htmlStr;
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

    }

    isValidStatus(status){
        return this.acceptedStatus.indexOf(status) + 1;
    }

    status(){
        return this.element.dataset;
    }

    addStatus(name){
        if(this.isValidStatus(name)) this.element.setAttribute('data-' + name, true)
    }

    removeStatus(name){
        if(this.isValidStatus(name)) this.element.removeAttribute('data-' + name)
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