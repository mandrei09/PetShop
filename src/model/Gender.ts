import { doc, getDoc } from "firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";

export class Gender {
    id : string;
    title : string;

    constructor(id : string, title : string){
        this.id = id 
        this.title = title
    }

    static toFirebasePath(genderId: string){
      const collectionName = 'Genders/'
      return collectionName + genderId
    }

    static toFirebase(gender: Gender): any {
        return {
          title: gender.title
        };
      }
    
    static fromFirebase(data: any): Gender {
        return new Gender(data.id, data.title);
    }

    static async fromFireBasePath(path: string): Promise<Gender | null> {
      try {
        const GenderDocRef = doc(ConfigAPI.db, path);
        const docSnapshot = await getDoc(GenderDocRef);
    
        if (docSnapshot.exists()) {
          const GenderData = docSnapshot.data();
          const gender = Gender.fromFirebase({
            id: docSnapshot.id,
            ...GenderData,
          });
          return gender;
        } else {
          console.error('Gender document does not exist');
          return null;
        }
      } catch (error) {
        console.error('Error getting Gender: ', error);
        return null;
      }
    }
}
