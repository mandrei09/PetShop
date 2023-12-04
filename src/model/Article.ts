import { Reply } from "./Reply";
import { User } from "./User";

export class Article {
    id : number;
    title? : string;
    image? : string;
    content?: string;
    user: User; 
    date? : Date;
    comments : Reply[];

    constructor(id : number, title : string, image : string, 
        content : string, user : User,date : Date, comments : Reply[]){
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.user = user;
        this.date = date;
        this.comments = comments;
    }   

}
