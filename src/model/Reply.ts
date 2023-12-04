import { User } from "./User";

export class Reply {
  id: number;
  user: User;
  date: Date;
  content: string;

  constructor(id: number, user: User, date: Date, content: string) {
    this.id = id;
    this.user = user;
    this.date = date;
    this.content = content;
  }
}
