import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor() 
  { 

  }

  getArtilesLikesCount(articleId : number){
    return -1
  }

  getArtilesCommentsCount(articleId : number){
    return -2
  }

  getArtilesSharesCount(articleId : number){
    return -3
  }

  getArtilesSavesCount(articleId : number){
    return -4
  }
}
