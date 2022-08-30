


export class Folders{

    static index(path){
        const URL = typeof aiLocalMode === 'undefined' ? 'https://central.aicardi.pro/' : 'http://127.0.0.1:3334/';
        return URL + (path || '');
    }

    static assets(path){
        return this.index('assets/' + (path || ''));
    }

    static medias(path){
        return this.assets('medias/' + (path || ''));
    }

    static images(path){
        return this.medias('img/' + (path || ''));
    }

}

const aiLogo = {
    transparency: 'aicardi.pro-transparency.svg',
    whiteDot: 'aicardi.pro-white-dot.svg'
}

export class Media{

    static logo(name){
        return Folders.images('logos/' + (aiLogo[name] || name));
    }
    
}