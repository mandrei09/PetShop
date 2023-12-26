import { doc, getDoc} from "firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";

export class Role {
    id: string;
    title: string;
  
    constructor(id: string, title: string) {
      this.id = id;
      this.title = title;
    }
  
    static toFirebase(role: Role | null): any {
      if(role)
        return {
          title: role.title
        };
      return null
    }

    static toFirebasePath(roleId: string){
      const collectionName = 'Roles/'
      return collectionName + roleId
    }
  
    static fromFirebase(data: any): Role {
      return new Role(data.id, data.title);
    }

    static async fromFireBasePath(path: string): Promise<Role | null> {
      try {
        const RoleDocRef = doc(ConfigAPI.db, path);
        const docSnapshot = await getDoc(RoleDocRef);
    
        if (docSnapshot.exists()) {
          const RoleData = docSnapshot.data();
          const role = Role.fromFirebase({
            id: docSnapshot.id,
            ...RoleData,
          });
          return role;
        } else {
          console.error('Role document does not exist');
          return null;
        }
      } catch (error) {
        console.error('Error getting Role: ', error);
        return null;
      }
    }
    
  }
  