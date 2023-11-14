import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableHeaderService {

constructor() { }
  private catOwnersHeader: { [key: string]: string } = {
    id: 'Id',
    email: 'Email',
    username: 'Username',
    age: 'Age',
    check: '',
  };

  private userTableHeader: { [key: string]: string } = {
    id: 'Id',
    email: 'Email',
    username: 'Username',
    role: 'Role',
    check: '',
  }

  public getCatOwnersHeader(){
    return this.catOwnersHeader;
  }

  public getUserTableHeader(){
    return this.userTableHeader;
  }
}
