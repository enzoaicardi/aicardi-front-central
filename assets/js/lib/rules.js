

export class Rule{

    static test(regex, value){
        if(regex.test(value)) return true;
        return false;
    }

    static std(value){ return Rule.test(/^.{3,}$/, value); }

    static none() { return false; }

    static name(value){ return Rule.test(/^[a-zÀ-ÖØ-öø-ÿ][-a-zÀ-ÖØ-öø-ÿ ]{2,}$/i, value); }

    static email(value){ return Rule.test(/^.+@.+\..+$/i, value); }

    static tel(value){ return Rule.test(/^(\+[0-9]{3}|0[0-9])[0-9]{8,}$/i, value); }

    static username(value){ return Rule.test(/^[-a-z_]{3,}$/i, value); }

    static password(value){ return Rule.test(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, value); }

    static siret(value){ return Rule.test(/[a-z0-9]{9,14}/i, value); }

    static iban(value){ return Rule.test(/[a-z]{2}[a-z0-9]{14,29}/i, value); }

    static postcode(value){ return Rule.test(/[0-9][0-9a-z][0-9]{3}/i, value); }

}