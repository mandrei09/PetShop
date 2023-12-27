import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from 'src/model/Article';
import { PublicFunctions } from 'src/model/PublicFunctions';
import { References } from 'src/model/References';
import { Reply } from 'src/model/Reply';
import { User } from 'src/model/User';
import { ArticleService } from 'src/services/ArticleService/Article.service';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-addArticleModal',
  templateUrl: './addArticleModal.component.html',
  styleUrls: ['./addArticleModal.component.scss']
})
export class AddArticleModalComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private articleService : ArticleService,
    private router : Router,
    public dialogRef: MatDialogRef<AddArticleModalComponent>
  ) 
  { 
    this.userService = userService
    this.articleService = articleService
  }

  async ngOnInit() {
    this.user = await this.userService.getUser()
  }

  onFileChanged(event : any) {
    this.image = event.target.files[0]
  }

  public title : string = ''
  public image! : File 
  public content : string = ''
  public user : User | null = null
  public date : Date = new Date()
  public comments : Reply[] = []
  public likes : User[] = []
  public saves : User[] = []
  public shares : User[] = []

  async createPost(){
    let imagePath 
    if(this.image!=undefined)
      imagePath = References.articlesPhotoRef + this.image.name
    else 
      imagePath = References.genericProfilePhoto
    const downloadURL = await PublicFunctions.onUploadImage(this.image,imagePath)
    let newArticle : Article = 
      new Article(
        '',
        this.title,
        downloadURL,
        this.content,
        this.user,
        this.date,
        this.comments,
        this.likes,
        this.saves,
        this.shares)
    
    const newArticleId = await this.articleService.addArticletoFirebase(newArticle)
    this.dialogRef.close()
    this.router.navigate(['news/' + newArticleId])
  }
}
