import { Injectable } from '@angular/core';
import { User } from 'src/model/User';
import { RoleService } from '../RoleService/Role.service';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { Cat } from 'src/model/Cat';

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

  public async addUserToFirebase(user: User): Promise<string | null> {
    try {
      const userData = User.toFirebase(user);
      const userCollectionRef = collection(ConfigAPI.db, 'Users');
      const newUserRef = await addDoc(userCollectionRef, userData);
      return newUserRef.id;
    } 
    catch (error) {
      console.error('Error adding user: ', error);
      return null;
    }
  }

  public async getUser(){
    return await this.firebaseGetCurentUser(sessionStorage.getItem('USERID')!);
  }

  public async addCatToUser(user: User | null, catPath : string): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, 'Users', user!.id); 
      await updateDoc(userDocRef, {
        cats: [...user!.cats, catPath] 
      });
      
      console.log('Cat added to user successfully!');
    } catch (error) {
      console.error('Error adding cat to user:', error);
    }
  }

  public updateUser(userId : string, newRole : string){
    //
  }

  public deleteUser(userId : string){
    //
  }

}
