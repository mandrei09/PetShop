import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

constructor() { }
  private applicationRoles : string[] = ['User','Editor','Administrator']
  public getRoles(){
    return this.applicationRoles;
  }
}
