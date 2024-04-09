class Person{
    /* Gewicht in kg, Größe in m*/
    name;

    #gewicht;

    groesse;

    constructor(name, gewicht, groesse){
        this.name = name;
        this.gewicht = gewicht;
        this.groesse = groesse;

    }
    get bmi(){
        return Math.round(this.gewicht/(this.groesse*this.groesse)).toFixed(1);
    }
    
    set gewicht(gewichtPar){
        //gewicht in kg
        if(gewichtPar < 1 || gewichtPar > 500){
            throw new Error("ungültiges Gewicht")
        }
        this.#gewicht = gewichtPar;
    }
    get gewicht(){
        return this.#gewicht;
    }
}
p = new Person('Hans', 100, 1.8);
console.log(p.bmi);