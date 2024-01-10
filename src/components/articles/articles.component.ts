import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/model/Article';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ArticleService } from 'src/services/ArticleService/Article.service';
import { MatDialog } from '@angular/material/dialog';
import { AddArticleModalComponent } from '../addArticleModal/addArticleModal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [UserService]
})
export class ArticlesComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private articleService : ArticleService,
    private dialog : MatDialog
    ) 
  { 
    this.userService = userService;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.articleService = articleService;
    this.dialog = dialog;
  }

  @Input() inProfile : boolean = false;
  public searchBarInput : string | null = '';

  public user : User | null = null;  
  @Input() public articles : Article[] | undefined = undefined


  navigateToProfile(id : string){
    this.router.navigate(['profile/' + id])
  }

  async ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.searchBarInput = queryParams.get('search');
    });
    this.user = await this.userService.getUser()
    if(!this.inProfile)
      this.articles = await this.articleService.firebaseGetAllArticles()
  }

  public onAddingPost(){
    const dialogRef = this.dialog.open(AddArticleModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {}
    });
    dialogRef.afterClosed().subscribe((res) => {
    });
  }
}
