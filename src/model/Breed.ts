export class Breed {
    id : number;
    name : string;
    estimatedPrice : number;

    constructor(
    id : number,
    name : string, 
    pedigree : boolean, 
    estimatedPrice : number){
        this.id = id ;
        this.name = name;
        this.estimatedPrice = estimatedPrice;
    }

}
