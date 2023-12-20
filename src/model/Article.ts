import { doc, getDoc } from "firebase/firestore";
import { ConfigAPI } from "./ConfigAPI";
import { Reply } from "./Reply";
import { User } from "./User";

export class Article {
  id: string;
  title?: string;
  image?: string;
  content?: string;
  user: User | null;
  date?: Date;
  comments: Reply[] | [];
  likes : number[] | [];
  saves : number[] | [];

  constructor(
    id: string,
    title: string,
    image: string,
    content: string,
    user: User | null,
    date: Date,
    comments: Reply[] | [],
    likes : number[] | [],
    saves : number[] | []
  ) 
  {
    this.id = id;
    this.title = title;
    this.image = image;
    this.content = content;
    this.user = user;
    this.date = date;
    this.comments = comments;
    this.likes = likes;
    this.saves = saves
  }

  static toFirebase(article: Article): any {
    if(article)
    {
      return {
        title: article.title,
        image: article.image,
        content: article.content,
        user: User.toFirebase(article.user),
        date: article.date,
        comments: article.comments.map((comment) => Reply.toFirebase(comment))
      };
    }
    return null 
  }

  static async fromFirebase(data: any): Promise<Article> {
    return new Article(
      data.id,
      data.title,
      data.image,
      data.content,
      await User.fromFireBasePath(data.user._key.toString()),
      data.date.toDate(),
      data.comments.map((comment: any) => Reply.fromFirebase(comment)),
      data.likes,
      data.saves
    );
  }

  static async fromFireBasePath(path: string): Promise<Article | null> {
    try {
      const ArticleDocRef = doc(ConfigAPI.db, path);
      const docSnapshot = await getDoc(ArticleDocRef);
  
      if (docSnapshot.exists()) {
        const ArticleData = docSnapshot.data();
        const newArticle = Article.fromFirebase({
          id: docSnapshot.id,
          ...ArticleData,
        });
        return newArticle;
      } else {
        console.error('Article document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting Article: ', error);
      return null;
    }
  }
}
