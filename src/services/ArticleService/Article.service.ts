import { Injectable } from '@angular/core';
import { Article } from 'src/model/Article';
import { UserService } from '../UserService/User.service';
import { Reply } from 'src/model/Reply';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private userService : UserService
  ) 
  { 
    this.userService = userService;
  }

  //user = this.userService.getUser()

  private articles : Article[] = [
    // {
    //   id : '0',
    //   title : 'Titlu 1',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   date : new Date('2023-10-21'),
    //   comments : [ 
    //     new Reply('0', this.user, new Date(), 'This is a sample comment.'),
    //     new Reply('1', this.user, new Date(), 'This is a sample comment.'),
    //     new Reply('2', this.user, new Date(), 'This is a sample comment.')]
    // },
    // {
    //   id : '1',
    //   title : 'Titlu 2',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : [new Reply('5', this.user, new Date(), 'This is a sample comment.')]
    // },
    // {
    //   id : '2',
    //   title : 'Titlu 3',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : []
    // },
    // {
    //   id : '3',
    //   title : 'Titlu 3',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : []
    // },
    // {
    //   id : '4',
    //   title : 'Titlu 3',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : [new Reply('3', this.user, new Date(), 'This is a sample comment.')]
    // },
    // {
    //   id : '5',
    //   title : 'Titlu 3',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : []
    // },
    // {
    //   id : '6',
    //   title : 'Titlu 1',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : []
    // },
    // {
    //   id : '7',
    //   title : 'Titlu 1',
    //   image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
    //   content : 'Content 1',
    //   user : this.user,
    //   comments : []
    // }
  ]

  getArticles(){
    return this.articles
  }

  getArticle(id : string){
    //return this.articles[id]
    //return null
  }

  getArtilesLikesCount(articleId : string){
    return -1
  }

  getArtilesCommentsCount(articleId : string){
    //return this.articles[articleId].comments.length;
    return -1
  }

  getArtilesSharesCount(articleId : string){
    return -3
  }

  getArtilesSavesCount(articleId : string){
    return -4
  }

  getPosts(index : number){
    if(index == 0) return this.getLikedPosts()
    else return this.getSavedPosts()
  }

  getLikedPosts(){
    return this.articles
  }

  getSavedPosts(){
    return this.articles
  }

  addComment(articleId : number,comment : Reply){
    //this.articles[articleId].comments.push(comment)
  }

  deleteArticle(articleId : string){
    this.articles = this.articles.filter(item => item.id != articleId)
  }
}
