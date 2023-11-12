import { Article } from "./Article";
import { Cat } from "./Cat";
import { Location } from "./Location";

export class User {
  id: string;
  email : string;
  phoneNumber : string;
  username : string;
  birthDate : Date;
  age : number;
  location : Location;
  role: string;
  profilePhoto? : string = 'https://thumbor.unica.ro/unsafe/1600x1023/smart/filters:format(webp):contrast(8):quality(75)/https://www.tvmania.ro/wp-content/uploads/2023/01/cine-este-gheboasa-din-echipa-faimosilor-de-la-survivor-romania-2023-1-2.jpg';
  followers : User[] = [];
  following : User[] = [];
  posts : Article[] = [];
  cats : Cat[] =[];
  profileDescription? :string;

  ageCalcuator(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
  
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) 
      return yearsDiff - 1;
    else 
      return yearsDiff;
  }

  constructor(id: string, email: string, phoneNumber : string, username: string, birthDate : Date, role: string, location : Location,
    followers : User[], following : User[], posts : Article[], cats : Cat[], profilePhoto?: string, profileDescription? : string) {
      this.id = id;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.username = username;
      this.birthDate = birthDate;
      this.age = this.ageCalcuator(this.birthDate);
      this.role = role;
      this.location = location;
      this.followers = followers;
      this.following = following;
      this.posts = posts;
      this.cats = cats;
      this.profilePhoto = profilePhoto;
      this.profileDescription = profileDescription;
    }
}

