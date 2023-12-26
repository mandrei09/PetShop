import { Breed } from "src/model/Breed";
import { User } from "./User";
import { Gender } from "./Gender";
import { doc, getDoc } from "@firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";

export class Cat {
  id: string;
  name: string;
  birthDate: Date;
  age: number;
  breed: Breed | null;
  isAdopted: boolean;
  gender: Gender | null;
  image: string;
  description: string;
  owners: (User | null)[] | [];

  constructor(
    id: string,
    name: string,
    birthDate: Date,
    age: number,
    breed: Breed | null,
    isAdopted: boolean,
    gender: Gender | null,
    image: string,
    owners: (User | null)[] | [],
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
      breed: Breed.toFirebasePath(cat.breed!.id),
      isAdopted: cat.isAdopted,
      gender: Gender.toFirebasePath(cat.gender!.id),
      image: cat.image,
      description: cat.description,
      owners: cat.owners.map((owner) => User.toFirebasePath(owner!.id))
    };
  }

  static toFirebasePath(catId: string){
    const collectionName = 'Cats/'
    return collectionName + catId
  }

  static async fromFirebase(data: any): Promise<Cat> {
    return new Cat(
      data.id,
      data.name,
      data.birthDate.toDate(),
      data.age,
      await Breed.fromFireBasePath(data.breed),
      data.isAdopted,
      await Gender.fromFireBasePath(data.gender),
      data.image,
      data.owners.length ? await Promise.all(data.owners.map(async (owner : string) => await User.fromFireBasePath(owner))) : [],
      data.description
    );
  }

  static async fromFireBasePath(path: string): Promise<Cat | null> {
    try {
      const CatDocRef = doc(ConfigAPI.db, path);
      const docSnapshot = await getDoc(CatDocRef);
  
      if (docSnapshot.exists()) {
        const catData = docSnapshot.data();
        const newCat = Cat.fromFirebase({
          id: docSnapshot.id,
          ...catData,
        });
        return newCat;
      } else {
        console.error('Cat document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting Cat: ', error);
      return null;
    }
  }
}
