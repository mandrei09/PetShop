import { doc, getDoc } from "firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";

export class Breed {
    id: string;
    name: string;
    estimatedPrice: number;
  
    constructor(id: string, name: string, estimatedPrice: number) {
      this.id = id;
      this.name = name;
      this.estimatedPrice = estimatedPrice;
    }

    static toFirebasePath(breedId: string){
      const collectionName = 'Breeds/'
      return collectionName + breedId
    }
  
    static toFirebase(breed: Breed): any {
      return {
        name: breed.name,
        estimatedPrice: breed.estimatedPrice
      };
    }
  
    static fromFirebase(data: any): Breed {
      return new Breed(data.id, data.name, data.estimatedPrice);
    }

    static async fromFireBasePath(path: string): Promise<Breed | null> {
      try {
        const BreedDocRef = doc(ConfigAPI.db, path);
        const docSnapshot = await getDoc(BreedDocRef);
    
        if (docSnapshot.exists()) {
          const BreedData = docSnapshot.data();
          const breed = Breed.fromFirebase({
            id: docSnapshot.id,
            ...BreedData,
          });
          return breed;
        } else {
          console.error('Breed document does not exist');
          return null;
        }
      } catch (error) {
        console.error('Error getting Breed: ', error);
        return null;
      }
    }
  }
  