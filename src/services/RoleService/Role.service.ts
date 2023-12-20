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

  // private roles: Role[] = [
  //   new Role(0, 'User'),
  //   new Role(1, 'Editor'),
  //   new Role(2, 'Administrator')
  // ];

  
  private componentAccessRoles : ComponentAccessRoles = {
    AdministratorComponent: { roles: ['Administrator'] },
    ArticlesComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ArticleDetailComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ProfileComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ProfileModalComponent: { roles: ['User', 'Editor', 'Administrator'] },
    AdoptComponent: { roles: ['User', 'Editor', 'Administrator'] },
    CatProfileComponent: { roles: ['User', 'Editor', 'Administrator'] },
    ContactComponent: { roles: ['User', 'Editor', 'Administrator'] },
  };
  

  // public getRoles(){
  //   return this.roles;
  // }

  // public getRole(id : number){
  //   return this.roles[id]
  // }

  public getComponentAccesRoles(component: string) {
    return this.componentAccessRoles[component].roles;
  }
  
}
