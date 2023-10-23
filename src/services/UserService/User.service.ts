import { Injectable } from '@angular/core';
import { User } from 'src/model/User';
import { Location } from 'src/model/Location';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  date : Date = new Date('2002-12-09');
  location = new Location(1, "California", "Los Angeles", "123 Main St");

  private user : User = new User('andrei','andrei-alexandru.mihai@gmail.com','0726858494','m_andrei09',this.date,'Administrator', this.location, [],[],[],'https://www.a-zanimals.co.uk/wp-content/uploads/2017/10/Sue-1-1-of-1-1024x1024.jpg','Descriere de test.');

  public getUser(){
    return this.user;
  }

  constructor() { }

}
