

export class Rule{

    static std(value){ return Rule.test(/^.{3,}$/, value); }

    static email(value){ return Rule.test(/^.+@.+\..+$/, value); }

    static username(value){ return Rule.test(/^[-a-z_]{3,}$/, value); }

    static password(value){ return Rule.test(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, value); }

    static match(value, matchValue){ return value === matchValue; }

    static test(regex, value){
        if(regex.test(value)) return true;
        return false;
    }

}