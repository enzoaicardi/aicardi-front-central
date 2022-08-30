

export class Format{

    static fullName(data){
        return (data.firstname ? data.firstname + ' ' : '') + (data.lastname || '');
    }

    static cityPostcode(data){
        let main = data.city || data.postcode;
        return data.city ? (main + (data.postcode ? (' (' + data.postcode + ')') : '')) : main;
    }

}