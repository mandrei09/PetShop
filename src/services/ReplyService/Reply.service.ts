import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Article } from 'src/model/Article';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { Reply } from 'src/model/Reply';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor() { }

  public collectionName : string = 'Comments'

  public async addReplytoFirebase(reply: Reply): Promise<string | null> {
    try {
      const replyData = Reply.toFirebase(reply);
      const repliesCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const newReplyRef = await addDoc(repliesCollectionRef, replyData);
      return newReplyRef.id;
    } catch (error) {
      console.error('Error adding reply: ', error);
      return null;
    }
  }

  public async addReplyToArticle(article: Article | null, replyPath : string): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, 'Articles', article!.id); 
      const comments = article!.comments.map((comment : Reply) => Reply.toFirebasePath(comment.id))
      await updateDoc(userDocRef, {
        comments: [...comments, replyPath] 
      });
      
      console.log('Reply added to user successfully!');
    } catch (error) {
      console.error('Error adding Reply to article:', error);
    }
  }

  public async updateReply(reply: Reply | null): Promise<void> {
    try {
      if (!reply) {
        console.error('Reply is null');
        return;
      }
      const replyDocRef = doc(ConfigAPI.db, this.collectionName, reply.id);
      const replyData = Reply.toFirebase(reply)
      await setDoc(replyDocRef, replyData);
      console.log('Comment updated!');
    } 
    catch (error) {
      console.error('Error updating Comment:', error);
    }
  }

  public async deleteReplyFromArticle(article: Article | null): Promise<void> {
    try {
      const userDocRef = doc(ConfigAPI.db, 'Articles', article!.id); 
      const comments = article!.comments.map((comment : Reply) => Reply.toFirebasePath(comment.id))
      await updateDoc(userDocRef, {
        comments: [...comments] 
      });
      
      console.log('Reply deleted successfully!');
    } catch (error) {
      console.error('Error deleting Reply from article:', error);
    }
  }

  public async deleteReplyFromFirebase(replyId: string): Promise<void> {
    try {
      const replyDocRef = doc(ConfigAPI.db, this.collectionName, replyId);
      await deleteDoc(replyDocRef);
      console.log('Reply deleted successfully!');
    } 
    catch (error) {
      console.error('Error deleting reply:', error);
    }
  }

  public async deleteAllRepliesFromArticleFromFirebase(comments : Reply[]): Promise<void> {
    try {
      comments.forEach(async (comment: Reply) => {
        const replyDocRef = doc(ConfigAPI.db, this.collectionName, comment!.id);
        await deleteDoc(replyDocRef);
      })
    } 
    catch (error) {
      console.error('Error deleting replies:', error);
    }
  }
}
