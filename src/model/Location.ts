import { doc, getDoc} from "firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";
export class Location {
  id: string;
  state: string;
  city: string;
  address: string;

  constructor(id: string, state: string, city: string, address: string) {
    this.id = id;
    this.state = state;
    this.city = city;
    this.address = address;
  }

  static toFirebase(location: Location | null): any {
    if(location)
    {
      return {
        state: location.state,
        city: location.city,
        address: location.address
      };
    }
    return null
    
  }

  static fromFirebase(data: any): Location {
    return new Location(data.id, data.state, data.city, data.address);
  }

  static async fromFireBasePath(path: string): Promise<Location | null> {
    try {
      const LocationDocRef = doc(ConfigAPI.db, path);
      const docSnapshot = await getDoc(LocationDocRef);
  
      if (docSnapshot.exists()) {
        const LocationData = docSnapshot.data();
        const newlocation = Location.fromFirebase({
          id: docSnapshot.id,
          ...LocationData,
        });
        return newlocation;
      } else {
        console.error('Location document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting Location: ', error);
      return null;
    }
  }
}
