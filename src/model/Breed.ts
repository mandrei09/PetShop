export class Breed {
    name : string;
    pedigree : boolean;
    estimatedPrice : number;

    constructor(
    name : string, 
    pedigree : boolean, 
    estimatedPrice : number){
        this.name = name;
        this.pedigree = pedigree;
        this.estimatedPrice = estimatedPrice;
    }

}
