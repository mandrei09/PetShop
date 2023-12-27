import { doc, getDoc } from "firebase/firestore";
import { User } from "./User";
import { ConfigAPI } from "./ConfigAPI";

export class Reply {
  id: string;
  user: User | null;
  date: Date;
  content: string;

  constructor(id: string, user: User | null, date: Date, content: string) {
    this.id = id;
    this.user = user;
    this.date = date;
    this.content = content;
  }

  static toFirebase(reply: Reply): any {
    return {
      user: User.toFirebasePath(reply.user!.id),
      date: reply.date,
      content: reply.content
    };
  }
  
  static toFirebasePath(replyId: string){
    const collectionName = 'Comments/'
    return collectionName + replyId
  }

  static async fromFirebase(data: any): Promise<Reply | null> {
    return new Reply(
      data.id,
      await User.fromFireBasePath(data.user),
      data.date.toDate(),
      data.content
    );
  }

  static async fromFireBasePath(path: string): Promise<Reply | null> {
    try {
      const commentDocRef = doc(ConfigAPI.db, path);
      const docSnapshot = await getDoc(commentDocRef);
  
      if (docSnapshot.exists()) {
        const commentData = docSnapshot.data();
        const newComment = Reply.fromFirebase({
          id: docSnapshot.id,
          ...commentData,
        });
        return newComment;
      } else {
        console.error('Comment document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error getting Comment: ', error);
      return null;
    }
  }
}
