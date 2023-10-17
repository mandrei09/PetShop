import { Injectable } from '@angular/core';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user : User = new User('1','andrei-alexandru.mihai@gmail.com','m_andrei09',['admin'],[],[],[]);

  constructor() { }

}
