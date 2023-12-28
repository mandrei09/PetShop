import { Injectable } from '@angular/core';
import { User } from 'src/model/User';
import { RoleService } from '../RoleService/Role.service';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { Cat } from 'src/model/Cat';
import { UserSimpleDetail } from 'src/model/UserSimpleDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private roleService : RoleService) 
  {
   this.roleService = roleService;
  }

  private collectionName = 'Users'
  private currentUser! : User 

  public async firebaseGetAllUsers(): Promise<User[]> {
    try {
      const usersCollectionRef = collection(ConfigAPI.db, this.collectionName);
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
    if(users.length)
    {
      this.currentUser = users[0]
      sessionStorage.setItem('USERID',this.currentUser.id)
      return true
    }
    return false
    
  }

  public async firebaseGetCurentUser(userId : string): Promise<User | null> {
    try {
      const usersCollectionRef = doc(ConfigAPI.db, this.collectionName, userId);
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
      const userCollectionRef = collection(ConfigAPI.db, this.collectionName);
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
      const userDocRef = doc(ConfigAPI.db, this.collectionName, user!.id); 
      await updateDoc(userDocRef, {
        cats: [...user!.cats, catPath] 
      });
      
      console.log('Cat added to user successfully!');
    } catch (error) {
      console.error('Error adding cat to user:', error);
    }
  }

  public async changeFollowers(user: User | null): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, this.collectionName, user!.id); 
      const followers = user!.followers.map((follower : UserSimpleDetail) => UserSimpleDetail.toFirebasePath(follower.id))
      await updateDoc(userDocRef, {
        followers: followers
      });
      
    } catch (error) {
      console.error(error);
    }
  }

  public async changeFollowing(user: User | null): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, this.collectionName, user!.id); 
      const following = user!.following.map((user : UserSimpleDetail) => UserSimpleDetail.toFirebasePath(user.id))
      await updateDoc(userDocRef, {
        following: following 
      });
      
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteCatFromUser(user: User | null): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, this.collectionName, user!.id); 
      await updateDoc(userDocRef, {
        cats: [] 
      });
      
      console.log('Cat deleted successfully!');
    } catch (error) {
      console.error('Error deleting cat!', error);
    }
  }

  public async updateRole(userId : string, rolePath : string): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, this.collectionName, userId); 
      await updateDoc(userDocRef, {
        role: rolePath 
      });
      
      console.log('Role updated!');
    } catch (error) {
      console.error('Error updating role!', error);
    }
  }

  public async deleteUserFromFirebase(userId: string): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, this.collectionName, userId);
      await deleteDoc(userDocRef);
      console.log('User deleted successfully!');
    } 
    catch (error) {
      console.error('Error deleting User:', error);
    }
  }

}
