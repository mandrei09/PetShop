import { Injectable } from '@angular/core';
import { Cat } from 'src/model/Cat';
import { UserService } from '../UserService/User.service';
import { User } from 'src/model/User';
import { Firestore, collection, getDoc, getDocs,doc, addDoc, updateDoc } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { CardTitleDirective } from '@coreui/angular';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  
  private cats: Cat[] = [];
  private collectionName = 'Cats'
 
  public async firebaseGetAllCats(): Promise<Cat[]> {
    try {
      const catsCollectionRef = collection(ConfigAPI.db, this.collectionName);
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

  public async firebaseGetAllUnadoptedCats(): Promise<Cat[]> {
    try {
      const catsCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const querySnapshot = await getDocs(catsCollectionRef);
  
      const cats: Cat[] = [];
      for (const doc of querySnapshot.docs) {
        const catData = doc.data();
        const cat = await Cat.fromFirebase({
          id: doc.id,
          ...catData,
        });
        if (cat !== null && cat.isAdopted === false) {
          cats.push(cat);
        }
      }
      return cats;
    } catch (error) {
      console.error('Error getting unadopted cats: ', error);
      return [];
    }
  }

  public async firebaseGetCatById(catId : string): Promise<Cat | null> {
    try {
      const catsCollectionRef = doc(ConfigAPI.db, this.collectionName,catId);
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
      const catsCollectionRef = collection(ConfigAPI.db, this.collectionName);
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

  public async adoptCat(catId: string, value : boolean): Promise<void> {
    try {
      const articleDocRef = doc(ConfigAPI.db, this.collectionName, catId); 
      await updateDoc(articleDocRef, {
        isAdopted : value
      });
      
    } catch (error) {
      console.error('Error un/adopting cat:', error);
    }
  }

  public async addOwnerToCat(cat: Cat | null, userPath : string): Promise<void> {
    try {
      const catDocRef = doc(ConfigAPI.db, this.collectionName, cat!.id); 
      await updateDoc(catDocRef, {
        owners: [...cat!.owners, userPath] 
      });
      
      console.log('Owner added to cat successfully!');
    } catch (error) {
      console.error('Error adding owner to cat:', error);
    }
  }

constructor(private userService : UserService) { 
  this.userService = userService;
}

}

