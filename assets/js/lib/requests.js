

export class API{

    static url(path){
        const URL = typeof aiLocalMode === 'undefined' ? 'https://api.aicardi.pro/' : 'http://127.0.0.1:3333/';
        return URL + (path || '');
    }

    static async request(v, path, options){

        return fetch(this.url(v + '/' + path), options)
        .then((response)=>{return response.json()})

    }

    static async get(v, path){

        return this.request(v, path, {
            method: 'GET'
        })

    }

}