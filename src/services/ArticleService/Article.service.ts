import { Injectable } from '@angular/core';
import { Article } from 'src/model/Article';
import { UserService } from '../UserService/User.service';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { ConfigAPI } from 'src/model/ConfigAPI';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public collectionName = 'Articles'
  constructor(
    private userService : UserService
  ) 
  { 
    this.userService = userService;
  }

  public async firebaseGetAllArticles(): Promise<Article[]> {
    try {
      const articlesCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const querySnapshot = await getDocs(articlesCollectionRef);
  
      const articles: Article[] = [];
      for (const doc of querySnapshot.docs) {
        const articleData = doc.data();
        const article = await Article.fromFirebase({
          id: doc.id,
          ...articleData,
        });
        if (article !== null) {
          articles.push(article);
        }
      }
      return articles;
    } catch (error) {
      console.error('Error getting articles: ', error);
      return [];
    }
  }

  public async firebaseGetAllArticlesFromUser(userPath : string): Promise<Article[]> {
    try {
      const articlesCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const querySnapshot = await getDocs(articlesCollectionRef);
  
      const articles: Article[] = [];
      for (const doc of querySnapshot.docs) {
        const articleData = doc.data();
        if(articleData['user'] === userPath)
        {
          const article = await Article.fromFirebase({
            id: doc.id,
            ...articleData,
          });
          if (article !== null) {
            articles.push(article);
          }
        }
      }
      return articles;
    } catch (error) {
      console.error('Error getting articles: ', error);
      return [];
    }
  }

  public async firebaseGetArticleById(articleId : string): Promise<Article | null> {
    try {
      const articlesCollectionRef = doc(ConfigAPI.db, this.collectionName, articleId);
      const querySnapshot = await getDoc(articlesCollectionRef);
      const articleData = querySnapshot.data();
      const article = await Article.fromFirebase({
          id: querySnapshot.id,
          ...articleData,
        });
      return article;
    }
    catch (error) {
      console.error('Error getting article: ', error);
      return null;
    }
  }

  public async addArticletoFirebase(article: Article): Promise<string | null> {
    try {
      const articleData = Article.toFirebase(article);
      const articlesCollectionRef = collection(ConfigAPI.db, this.collectionName);
      const newArticleRef = await addDoc(articlesCollectionRef, articleData);
      return newArticleRef.id;
    } catch (error) {
      console.error('Error adding article: ', error);
      return null;
    }
  }

  getArtilesLikesCount(article : Article){
    return article.likes.length
  }

  public async addLikeToPost(article: Article | null, userPath : string): Promise<void> {
    try {
      const articleDocRef = doc(ConfigAPI.db, this.collectionName, article!.id); 
      await updateDoc(articleDocRef, {
        likes: [...article!.likes, userPath] 
      });
      
      console.log('Post liked!');
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  public async removeLikeFromPost(article: Article | null, userPath : string): Promise<void> {
    try {
      const articleDocRef = doc(ConfigAPI.db, this.collectionName, article!.id);
      const updatedLikes = article!.likes.filter((user) => User.toFirebasePath(user.id) !== userPath); 
      await updateDoc(articleDocRef, {
        likes: updatedLikes
      });
      
      console.log('Post unliked!');
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  }

  public async addSaveToPost(article: Article | null, userPath : string): Promise<void> {
    try {
      const articleDocRef = doc(ConfigAPI.db, this.collectionName, article!.id); 
      await updateDoc(articleDocRef, {
        saves: [...article!.saves, userPath] 
      });
      
      console.log('Post saved!');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }

  public async removeSaveFromPost(article: Article | null, userPath : string): Promise<void> {
    try {
      const articleDocRef = doc(ConfigAPI.db, this.collectionName, article!.id);
      const updatedSaves = article!.saves.filter((user) => User.toFirebasePath(user.id) !== userPath); 
      await updateDoc(articleDocRef, {
        saves: updatedSaves
      });
      
      console.log('Post unsaved!');
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
  }

  public async deleteArticleFromFirebase(articleId: string): Promise<void> {
    try {
      const articleDocRef = doc(ConfigAPI.db, this.collectionName, articleId);
      await deleteDoc(articleDocRef);
      console.log('Article deleted successfully!');
    } 
    catch (error) {
      console.error('Error deleting Article:', error);
    }
  }

  getArtilesCommentsCount(article : Article){
    return article.comments.length
  }

  getArtilesSharesCount(article : Article){
    return article.shares.length
  }

  getArtilesSavesCount(article : Article){
    return article.saves.length
  }

  async getPosts(index : number){
    if(index == 0) return await this.getLikedPosts()
    else return await this.getSavedPosts()
  }

  public getArticleLikes(article : Article){
    return article.likes.map((user : User) => User.toFirebasePath(user.id))
  }

  public async getLikedPosts() {
    try {
      const allArticles = await this.firebaseGetAllArticles();
      const currentUser = await this.userService.getUser();
  
      const likedArticles: Article[] = allArticles.filter((article: Article) =>
        (this.getArticleLikes(article)).includes(User.toFirebasePath(currentUser!.id))
      );
  
      return likedArticles;
    } catch (error) {
      console.error('Error fetching liked posts:', error);
      return [];
    }
  }
  
  public getArticleSaves(article : Article){
    return article.saves.map((user : User) => User.toFirebasePath(user.id))
  }

  public async getSavedPosts() {
    try {
      const allArticles = await this.firebaseGetAllArticles();
      const currentUser = await this.userService.getUser();
  
      const savedArticles: Article[] = allArticles.filter((article: Article) =>
        (this.getArticleSaves(article)).includes(User.toFirebasePath(currentUser!.id))
      );
  
      return savedArticles;
    } catch (error) {
      console.error('Error fetching liked posts:', error);
      return [];
    }
  }
}
