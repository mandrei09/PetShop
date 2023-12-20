import { doc, getDoc } from "firebase/firestore";
import { Article } from "./Article";
import { Cat } from "./Cat";
import { ConfigAPI } from "./ConfigAPI";
import { Location } from "./Location";
import { Role } from "./Role";

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
  profilePhoto?: string = 'https://thumbor.unica.ro/unsafe/1600x1023/smart/filters:format(webp):contrast(8):quality(75)/https://www.tvmania.ro/wp-content/uploads/2023/01/cine-este-gheboasa-din-echipa-faimosilor-de-la-survivor-romania-2023-1-2.jpg';
  followers: User[] = [];
  following: User[] = [];
  posts: Article[] = [];
  cats: Cat[] = [];
  profileDescription?: string;

  ageCalculator(birthdate: Date): number {
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
    followers: User[],
    following: User[],
    posts: Article[],
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
    this.age = this.ageCalculator(this.birthDate);
    this.role = role;
    this.location = location;
    this.followers = followers;
    this.following = following;
    this.posts = posts;
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
        role: Role.toFirebase(user.role),
        location: Location.toFirebase(user.location),
        followers: user.followers.map((follower) => User.toFirebase(follower)),
        following: user.following.map((following) => User.toFirebase(following)),
        posts: user.posts.map((post) => Article.toFirebase(post)),
        cats: user.cats.map((cat) => Cat.toFirebase(cat)),
        profilePhoto: user.profilePhoto,
        profileDescription: user.profileDescription
      };
    }
    return null
  }

   static async fromFirebase(data: any): Promise<User | null> {
    return new User(
      data.id,
      data.email,
      data.phoneNumber,
      data.username,
      data.password,
      data.birthDate.toDate(),
      await Role.fromFireBasePath(data.role._key.toString()),
      await Location.fromFireBasePath(data.location._key.toString()),      
      data.followers.map((follower: any) => User.fromFirebase(follower)),
      data.following.map((following: any) => User.fromFirebase(following)),
      data.posts.map((post: any) => Article.fromFirebase(post)),
      data.cats.map((cat: any) => Cat.fromFirebase(cat)),
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
