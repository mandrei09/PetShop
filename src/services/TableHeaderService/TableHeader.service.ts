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
  age: 'Age'
  };

  public getCatOwnersHeader(){
    return this.catOwnersHeader;
  }
}
