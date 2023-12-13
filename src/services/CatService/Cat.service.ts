import { Injectable } from '@angular/core';
import { Breed } from 'src/model/Breed';
import { Cat } from 'src/model/Cat';
import { UserService } from '../UserService/User.service';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private breeds: Breed[] = [
    {
      id: 1,
      name: 'Siamese',
      estimatedPrice: 500,
    },
    {
      id: 2,
      name: 'Persian',
      estimatedPrice: 700,
    },
    {
      id: 3,
      name: 'Maine Coon',
      estimatedPrice: 600,
    },
    {
      id: 4,
      name: 'Scottish Fold',
      estimatedPrice: 800,
    },
    {
      id: 5,
      name: 'Bengal',
      estimatedPrice: 900,
    },
  ];
  
  private cats: Cat[] = [
    {
      id: 1,
      name: 'Whiskers',
      birthDate: new Date('2019-04-15'),
      age: 4,
      breed: this.breeds[0],
      isAdopted: false,
      gender: 'Male',
      image: 'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
      owners : [this.userService.getUser(),
        this.userService.getUser(),
        this.userService.getUser(),
        this.userService.getUser(),
        this.userService.getUser(),
        new User(
        'john_doe',
        'john.doe@example.com',
        '123456789',
        'johnny',
        'admin',
        new Date('1990-05-25'),
        this.userService.getUser().role,
        this.userService.getUser().location,
        [],
        [],
        [],
        [],
        'https://example.com/profile.jpg',
        'Some description about the user.'
      )],
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 2,
      name: 'Fluffy',
      birthDate: new Date('2018-12-10'),
      age: 3,
      breed: this.breeds[1],
      isAdopted: true,
      gender: 'Female',
      image: 'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
      owners : [this.userService.getUser()],
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 3,
      name: 'Simba',
      birthDate: new Date('2020-02-22'),
      age: 2,
      breed: this.breeds[2],
      isAdopted: false,
      gender: 'Male',
      image: 'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
      owners : [this.userService.getUser()],
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 4,
      name: 'Luna',
      birthDate: new Date('2017-08-05'),
      age: 5,
      breed: this.breeds[3],
      isAdopted: true,
      gender: 'Female',
      image: 'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
      owners : [this.userService.getUser()],
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: 5,
      name: 'Tiger',
      birthDate: new Date('2019-06-30'),
      age: 4,
      breed: this.breeds[4],
      isAdopted: false,
      gender: 'Male',
      image: 'http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
      owners : [this.userService.getUser()],
      description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
  ];

  public getCats(){
    return this.cats;
  }
  

constructor(private userService : UserService) { 
  this.userService = userService;
}

}
