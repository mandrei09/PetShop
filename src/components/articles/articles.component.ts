import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/model/Article';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ArticleService } from 'src/services/ArticleService/Article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [UserService]
})
export class ArticlesComponent implements OnInit {

  constructor(private userService : UserService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private articleService : ArticleService) { 
    this.userService = userService;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.articleService = articleService
  }

  @Input() inProfile : boolean = false;
  public searchBarInput : string | null = '';

  public user : User = this.userService.getUser();  
  public articles = this.articleService.getArticles()


  navigateToProfile(id : string){
    this.router.navigate(['profile/' + id])
  }

  ngOnInit() { //Asta se adauga pentru fiecare componenta unde vrei sa faci search.
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.searchBarInput = queryParams.get('search');
    });
  }
  

}
