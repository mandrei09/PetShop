import { Breed } from "src/model/Breed";
import { User } from "./User";

export class Cat {
    id : number;
    name : string;
    birthDate : Date;
    age: number;
    breed : Breed;
    isAdopted : boolean;
    gender : string;
    image : string;
    description : string;
    owners : User[]; 

    constructor(id : number, name: string, birthDate: Date, age: number, 
      breed: Breed, isAdopted: boolean, gender: string, image : string, owners : User[],
      description : string) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.age = age;
        this.breed = breed;
        this.isAdopted = isAdopted;
        this.gender = gender;
        this.image = image;
        this.owners = owners;
        this.description = description;
      }
}
