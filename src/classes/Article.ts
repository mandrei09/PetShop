export class Article {
    id : number;
    title : string;
    image : string;
    content: string;

    constructor(id : number, title : string, image : string, content : string){
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
    }

}
