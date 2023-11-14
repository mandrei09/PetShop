import { Injectable } from '@angular/core';
import { User } from 'src/model/User';
import { Location } from 'src/model/Location';
import { CatService } from '../CatService/Cat.service';
import { Cat } from 'src/model/Cat';
import { Breed } from 'src/model/Breed';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  date : Date = new Date('2002-12-09');
  location = new Location(1, "California", "Los Angeles", "123 Main St");


  private user : User = new User('andrei','andrei-alexandru.mihai@gmail.com','0726858494','m_andrei09',this.date,'Administrator', this.location, 
  [],
  [],
  [],
  [new Cat(
    1, // ID
    'Whiskers1', // Name
    new Date('2019-05-25'), // Birthdate
    4, // Age
    new Breed(1,'1',true,200), // Breed (assuming Breed is another class)
    true, // Is adopted
    'Male', // Gender
    'cat.jpg',
    [],// Image URL
    'Whiskers is a lovely cat!', // Description
     // Array of User owners (assuming User is another class)
  ),
  new Cat(
    2, // ID
    'Whiskers2', // Name
    new Date('2019-05-25'), // Birthdate
    4, // Age
    new Breed(1,'1',true,200), // Breed (assuming Breed is another class)
    true, // Is adopted
    'Male', // Gender
    'cat.jpg',
    [],// Image URL
    'Whiskers is a lovely cat!', // Description
     // Array of User owners (assuming User is another class)
  )],
  'https://www.a-zanimals.co.uk/wp-content/uploads/2017/10/Sue-1-1-of-1-1024x1024.jpg','Descriere de test.');

  public getUser(){
    return this.user;
  }

  public getAllUsers(){
    let allUsers : User[] = [this.getUser(),this.getUser(),this.getUser()];
    return allUsers;
  }

  constructor() 
  {
  }

}
