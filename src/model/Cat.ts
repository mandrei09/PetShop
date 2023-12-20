import { Breed } from "src/model/Breed";
import { User } from "./User";
import { Gender } from "./Gender";

export class Cat {
  id: string;
  name: string;
  birthDate: Date;
  age: number;
  breed: Breed;
  isAdopted: boolean;
  gender: Gender;
  image: string;
  description: string;
  owners: User[];

  constructor(
    id: string,
    name: string,
    birthDate: Date,
    age: number,
    breed: Breed,
    isAdopted: boolean,
    gender: Gender,
    image: string,
    owners: User[],
    description: string
  ) {
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

  static toFirebase(cat: Cat): any {
    return {
      name: cat.name,
      birthDate: cat.birthDate,
      age: cat.age,
      breed: Breed.toFirebase(cat.breed),
      isAdopted: cat.isAdopted,
      gender: Gender.toFirebase(cat.gender),
      image: cat.image,
      description: cat.description,
      owners: cat.owners.map((owner) => User.toFirebase(owner))
    };
  }

  static fromFirebase(data: any): Cat {
    return new Cat(
      data.id,
      data.name,
      data.birthDate.toDate(),
      data.age,
      Breed.fromFirebase(data.breed),
      data.isAdopted,
      Gender.fromFirebase(data.gender),
      data.image,
      data.owners.map((owner: any) => User.fromFirebase(owner)),
      data.description
    );
  }
}
