import { Injectable } from '@angular/core';
import { Cat } from 'src/model/Cat';
import { UserService } from '../UserService/User.service';
import { User } from 'src/model/User';
import { Firestore, collection, getDoc, getDocs,doc, addDoc } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { CardTitleDirective } from '@coreui/angular';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  
  private cats: Cat[] = [];
 
  public async firebaseGetAllCats(): Promise<Cat[]> {
    try {
      const catsCollectionRef = collection(ConfigAPI.db, 'Cats');
      const querySnapshot = await getDocs(catsCollectionRef);
  
      const cats: Cat[] = [];
      for (const doc of querySnapshot.docs) {
        const catData = doc.data();
        const cat = await Cat.fromFirebase({
          id: doc.id,
          ...catData,
        });
        if (cat !== null) {
          cats.push(cat);
        }
      }
      return cats;
    } catch (error) {
      console.error('Error getting cats: ', error);
      return [];
    }
  }

  public async firebaseGetCatById(catId : string): Promise<Cat | null> {
    try {
      const catsCollectionRef = doc(ConfigAPI.db, 'Cats',catId);
      const querySnapshot = await getDoc(catsCollectionRef);
      const catData = querySnapshot.data();
      const cat = await Cat.fromFirebase({
          id: querySnapshot.id,
          ...catData,
        });
      return cat;
    }
    catch (error) {
      console.error('Error getting cat: ', error);
      return null;
    }
  }

  public async addCattoFirebase(cat: Cat): Promise<string | null> {
    try {
      const catData = Cat.toFirebase(cat);
      const catsCollectionRef = collection(ConfigAPI.db, 'Cats');
      const newCatRef = await addDoc(catsCollectionRef, catData);
      return newCatRef.id;
    } catch (error) {
      console.error('Error adding cat: ', error);
      return null;
    }
  }

  public getCats(){
    return this.cats;
  }
  

constructor(private userService : UserService) { 
  this.userService = userService;
}

}

