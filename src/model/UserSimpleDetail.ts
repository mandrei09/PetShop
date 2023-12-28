import { doc, getDoc } from "firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";

export class UserSimpleDetail {
  id: string;
  username: string;
  profilePhoto?: string

  constructor(
    id: string,
    username: string,
    profilePhoto: string,
  ) {
    this.id = id;
    this.username = username;
    this.profilePhoto = profilePhoto;
  }

  static toFirebase(user: UserSimpleDetail | null): any {
    if(user)
    {
      return {
        username: user.username,
        profilePhoto: user.profilePhoto,
      };
    }
    return null
  }

  static toFirebasePath(userId: string){
    const collectionName = 'Users/'
    return collectionName + userId
  }

   static async fromFirebase(data: any): Promise<UserSimpleDetail | null> {
    return new UserSimpleDetail(
      data.id,
      data.username,
      data.profilePhoto,
    );
  }

  static async fromFireBasePath(path: string): Promise<UserSimpleDetail | null> {
    try {
      const UserDocRef = doc(ConfigAPI.db, path);
      const docSnapshot = await getDoc(UserDocRef);
  
      if (docSnapshot.exists()) {
        const UserData = docSnapshot.data();
        const newUser = UserSimpleDetail.fromFirebase({
          id: docSnapshot.id,
          ...UserData,
        });
        return newUser;
      } else {
        console.error('User document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting User: ', error);
      return null;
    }
  }
}
