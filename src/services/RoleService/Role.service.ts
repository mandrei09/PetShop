import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { Role } from 'src/model/Role';

type ComponentAccessRoles = {
  [key: string]: { roles: string[] };
};

@Injectable({
  providedIn: 'root'
})


export class RoleService {

  constructor() { }
  private collectionName = 'Roles'

  private componentAccessRoles : ComponentAccessRoles = {
    AdministratorComponent: { roles: ['Administrator'] },
    ArticlesComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ArticleDetailComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ProfileComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ProfileModalComponent: { roles: ['User', 'Editor', 'Administrator'] },
    AdoptComponent: { roles: ['User', 'Editor', 'Administrator'] },
    CatProfileComponent: { roles: ['User', 'Editor', 'A,dministrator'] },
    ProblemsComponent: { roles: ['Editor', 'Administrator'] },
    ContactComponent: { roles: ['User', 'Editor', 'Administrator'] },
  };
  
  public getComponentAccesRoles(component: string) {
    return this.componentAccessRoles[component].roles;
  }

  public async firebaseGetAllRoles(): Promise<Role[]> {
    try {
      const roleCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const querySnapshot = await getDocs(roleCollectionRef);

      const roles: Role[] = [];
      querySnapshot.forEach((doc) => {
        const roleData = doc.data();
        const role = Role.fromFirebase({
          id: doc.id,
          ...roleData,
        });
        roles.push(role);
      });

      return roles;
    } catch (error) {
      console.error('Error getting roles: ', error);
      return [];
    }
  }
  
}
