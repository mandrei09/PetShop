import { Article } from "./Article";

export class User {
  id: string;
  email : string;
  username : string;
  roles: string[];
  profilePhoto? : string = 'https://thumbor.unica.ro/unsafe/1600x1023/smart/filters:format(webp):contrast(8):quality(75)/https://www.tvmania.ro/wp-content/uploads/2023/01/cine-este-gheboasa-din-echipa-faimosilor-de-la-survivor-romania-2023-1-2.jpg';
  followers : User[] = [];
  following : User[] = [];
  posts : Article[] = [];

  constructor(id: string, email: string, username: string, roles: string[], 
    followers : User[], following : User[], posts : Article[], profilePhoto?: string) {
      this.id = id;
      this.email = email;
      this.username = username;
      this.roles = roles;
      this.followers = followers;
      this.following = following;
      this.posts = posts;
      this.profilePhoto = profilePhoto;
    }
}

