import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { Gender } from 'src/model/Gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

constructor() { }
  public async firebaseGetAllGenders(): Promise<Gender[]> {
    try {
      const gendersCollectionRef = collection(ConfigAPI.db, 'Genders');
      const querySnapshot = await getDocs(gendersCollectionRef);

      const genders: Gender[] = [];
      querySnapshot.forEach((doc) => {
        const genderData = doc.data();
        const gender = Gender.fromFirebase({
          id: doc.id,
          ...genderData,
        });
        genders.push(gender);
      });

      return genders;
    } catch (error) {
      console.error('Error getting genders: ', error);
      return [];
    }
  }
}
