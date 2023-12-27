import { Injectable } from '@angular/core';
import { Role } from 'src/model/Role';

type ComponentAccessRoles = {
  [key: string]: { roles: string[] };
};

@Injectable({
  providedIn: 'root'
})


export class RoleService {

  constructor() { }

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
  
}
