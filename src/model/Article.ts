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
  comments: Reply[]
  likes : User[] | [];
  saves : User[] | [];
  shares : User[] | [];

  constructor(
    id: string,
    title: string,
    image: string,
    content: string,
    user: User | null,
    date: Date,
    comments: Reply[] | [],
    likes : User[] | [],
    saves : User[] | [],
    shares : User[] | []
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
    this.shares = shares
  }

  static toFirebase(article: Article): any {
    if(article)
    {
      return {
        title: article.title,
        image: article.image,
        content: article.content,
        user: User.toFirebasePath(article.user!.id),
        date: article.date,
        comments: article.comments.map((comment) => Reply.toFirebasePath(comment!.id)),
        likes : article.likes.map((like) => User.toFirebasePath(like!.id)),
        saves : article.saves.map((save) => User.toFirebasePath(save!.id)),
        shares : article.shares.map((share) => User.toFirebasePath(share!.id))
      };
    }
    return null 
  }

  static toFirebasePath(articleId: string){
    const collectionName = 'Posts/'
    return collectionName + articleId
  }

  static async fromFirebase(data: any): Promise<Article> {
    return new Article(
      data.id,
      data.title,
      data.image,
      data.content,
      await User.fromFireBasePath(data.user),
      data.date.toDate(),
      data.comments.length ? await Promise.all(data.comments.map(async (comment : string) => await Reply.fromFireBasePath(comment))) : [],
      data.likes.length ? await Promise.all(data.likes.map(async (like : string) => await User.fromFireBasePath(like))) : [],
      data.saves.length ? await Promise.all(data.saves.map(async (save : string) => await User.fromFireBasePath(save))) : [],
      data.shares.length ? await Promise.all(data.shares.map(async (share : string) => await User.fromFireBasePath(share))) : [],
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
