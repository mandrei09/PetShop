import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Article } from 'src/model/Article';
import { ArticleService } from 'src/services/ArticleService/Article.service';

@Component({
  selector: 'app-postsModal',
  templateUrl: './postsModal.component.html',
  styleUrls: ['./postsModal.component.scss']
})
export class PostsModalComponent implements OnInit {

  constructor
  (
    public articleService : ArticleService,
    public router : Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PostsModalComponent>,

  ) 
  { 
    this.articleService = articleService
    this.router = router
    this.dialogRef = dialogRef;
  }

  async ngOnInit() {
    this.posts = await this.articleService.getPosts(this.data.methodIndex)
  }

  public title : string = this.data.title
  public posts : Article[] | undefined = undefined 

  navigateToProfile(id : string){
    this.router.navigate(['profile/' + id])
    this.dialogRef.close();
  }
}

