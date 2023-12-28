import { doc, getDoc } from "firebase/firestore";
import { Article } from "./Article";
import { Cat } from "./Cat";
import { ConfigAPI } from "./ConfigAPI";
import { Location } from "./Location";
import { Role } from "./Role";
import { UserSimpleDetail } from "./UserSimpleDetail";

export class User {
  id: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  birthDate: Date;
  age: number;
  location: Location | null;
  role: Role | null;
  profilePhoto?: string
  followers: UserSimpleDetail[] = [];
  following: UserSimpleDetail[] = [];
  cats: Cat[] = [];
  profileDescription?: string;

  static ageCalculator(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
  
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) 
      return yearsDiff - 1;
    else 
      return yearsDiff;
  }

  constructor(
    id: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string,
    birthDate: Date,
    role: Role | null,
    location: Location | null,
    followers: UserSimpleDetail[],
    following: UserSimpleDetail[],
    cats: Cat[],
    profilePhoto?: string,
    profileDescription?: string
  ) {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.password = password;
    this.birthDate = birthDate;
    this.age = User.ageCalculator(this.birthDate);
    this.role = role;
    this.location = location;
    this.followers = followers;
    this.following = following;
    this.cats = cats;
    this.profilePhoto = profilePhoto;
    this.profileDescription = profileDescription;
  }

  static toFirebase(user: User | null): any {
    if(user)
    {
      return {
        email: user.email,
        phoneNumber: user.phoneNumber,
        username: user.username,
        password: user.password,
        birthDate: user.birthDate,
        age: user.age,
        location: Location.toFirebase(user.location),
        role: Role.toFirebasePath(user.role!.id),
        followers: user.followers.map((follower) => UserSimpleDetail.toFirebase(follower)),
        following: user.following.map((following) => UserSimpleDetail.toFirebase(following)),
        cats: user.cats.map((cat) => Cat.toFirebase(cat)),
        profilePhoto: user.profilePhoto,
        profileDescription: user.profileDescription
      };
    }
    return null
  }

  static toFirebasePath(userId: string){
    const collectionName = 'Users/'
    return collectionName + userId
  }

   static async fromFirebase(data: any): Promise<User | null> {
    return new User(
      data.id,
      data.email,
      data.phoneNumber,
      data.username,
      data.password,
      data.birthDate.toDate(),
      await Role.fromFireBasePath(data.role),
      Location.fromFirebase(data.location),
      data.followers.length ? await Promise.all(data.followers.map(async (user : string) => await UserSimpleDetail.fromFireBasePath(user))) : [],
      data.following.length ? await Promise.all(data.following.map(async (user : string) => await UserSimpleDetail.fromFireBasePath(user))) : [],      
      data.cats.length ? await Promise.all(data.cats.map(async (cat : string) => await Cat.fromFireBasePath(cat))) : [],
      data.profilePhoto,
      data.profileDescription
    );
  }

  static async fromFireBasePath(path: string): Promise<User | null> {
    try {
      const UserDocRef = doc(ConfigAPI.db, path);
      const docSnapshot = await getDoc(UserDocRef);
  
      if (docSnapshot.exists()) {
        const UserData = docSnapshot.data();
        const newUser = User.fromFirebase({
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
