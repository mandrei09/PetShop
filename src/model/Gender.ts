export class Gender {
    id : string;
    title : string;

    constructor(id : string, title : string){
        this.id = id 
        this.title = title
    }

    static toFirebase(gender: Gender): any {
        return {
          title: gender.title
        };
      }
    
    static fromFirebase(data: any): Gender {
        return new Gender(data.id, data.title);
    }
}
