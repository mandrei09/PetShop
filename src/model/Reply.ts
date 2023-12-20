import { User } from "./User";

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
      user: User.toFirebase(reply.user),
      date: reply.date,
      content: reply.content
    };
  }

  static async fromFirebase(data: any): Promise<Reply | null> {
    return new Reply(
      data.id,
      await User.fromFireBasePath(data.user._key.toString()),
      data.date.toDate(), // Assuming Firestore Timestamp is stored
      data.content
    );
  }
}
