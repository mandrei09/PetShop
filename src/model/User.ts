export class User {
    id: string;
    email : string;
    username : string;
    roles: string[];
    profilePhoto? : string = 'perm_identity';

    constructor(id: string, email: string, username: string, roles: string[], profilePhoto?: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.profilePhoto = profilePhoto;
      }
}

