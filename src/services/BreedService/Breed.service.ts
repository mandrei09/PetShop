import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { Breed } from 'src/model/Breed';
import { ConfigAPI } from 'src/model/ConfigAPI';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor() {}

  public async firebaseGetAllBreeds(): Promise<Breed[]> {
    try {
      const breedsCollectionRef = collection(ConfigAPI.db, 'Breeds');
      const querySnapshot = await getDocs(breedsCollectionRef);

      const breeds: Breed[] = [];
      querySnapshot.forEach((doc) => {
        const breedData = doc.data();
        const breed = Breed.fromFirebase({
          id: doc.id,
          ...breedData,
        });
        breeds.push(breed);
      });

      return breeds;
    } catch (error) {
      console.error('Error getting breeds: ', error);
      return [];
    }
  }
}
