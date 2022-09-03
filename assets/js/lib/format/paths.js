
export class Path{

    static index(path){
        const URL = typeof aiLocalMode === 'undefined' ? 'https://central.aicardi.pro/' : 'http://127.0.0.1:3334/'
        return URL + (path || '')
    }

    static assets(path){
        return this.index('assets/' + path)
    }

    static medias(path){
        return this.assets('medias/' + path)
    }

    static images(path){
        return this.medias('img/' + path)
    }

}