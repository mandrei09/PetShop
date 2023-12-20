import { Injectable } from '@angular/core';
import { User } from 'src/model/User';
import { RoleService } from '../RoleService/Role.service';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private roleService : RoleService) 
  {
   this.roleService = roleService;
  }

  private currentUser! : User 

  public async firebaseGetAllUsers(): Promise<User[]> {
    try {
      const usersCollectionRef = collection(ConfigAPI.db, 'Users');
      const querySnapshot = await getDocs(usersCollectionRef);
  
      const users: User[] = [];
      for (const doc of querySnapshot.docs) {
        const userData = doc.data();
        const user = await User.fromFirebase({
          id: doc.id,
          ...userData,
        });
        if (user !== null) {
          users.push(user);
        }
      }
      return users;
    } catch (error) {
      console.error('Error getting users: ', error);
      return [];
    }
  }
  

  public async setCurrentUser(username : string, password : string){
    const users = (await this.firebaseGetAllUsers())
      .filter(user => user.username === username && user.password === password)
    this.currentUser = users[0]
    sessionStorage.setItem('USERID',this.currentUser.id)
  }

  public async firebaseGetCurentUser(userId : string): Promise<User | null> {
    try {
      const usersCollectionRef = doc(ConfigAPI.db, 'Users',userId);
      const querySnapshot = await getDoc(usersCollectionRef);
      const userData = querySnapshot.data();
      const user = await User.fromFirebase({
          id: querySnapshot.id,
          ...userData,
        });
      return user;
    }
    catch (error) {
      console.error('Error getting user: ', error);
      return null;
    }
  }

  public async getUser(){
    return await this.firebaseGetCurentUser(sessionStorage.getItem('USERID')!);
  }

  public updateUser(userId : string, newRole : string){
    //
  }

  public deleteUser(userId : string){
    //
  }

}
