import { Breed } from "src/model/Breed";

export class Cat {
    name : string;
    birthDate : Date;
    age: number;
    breed : Breed;
    isAdopted : boolean;
    gender : string; 

    constructor(name: string, birthDate: Date, age: number, breed: Breed, isAdopted: boolean, gender: string) {
        this.name = name;
        this.birthDate = birthDate;
        this.age = age;
        this.breed = breed;
        this.isAdopted = isAdopted;
        this.gender = gender;
      }
}
