import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/model/Article';
import { Reply } from 'src/model/Reply';
import { User } from 'src/model/User';
import { ArticleService } from 'src/services/ArticleService/Article.service';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-articleDetail',
  templateUrl: './articleDetail.component.html',
  styleUrls: ['./articleDetail.component.scss'],
  providers: [UserService],
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userService = userService;
    this.articleService = articleService;
    this.router = router;
  }

  ngOnInit(){
    // Retrieve the 'id' parameter from the route
    this.route.params.subscribe((params: Params) => {
      this.articleId = parseInt(params['id']); // Access the 'id' parameter from the route
      // Now you can use this.articleId in your component logic
    });
    this.article = this.articleService.getArticle(this.articleId);
  }

  public user: User = this.userService.getUser();
  public articleId!: number;
  public article! : Article

  public navigateToProfile(id: string) {
    this.router.navigate(['profile/' + id]);
  }

  public articlesLikesCount: number = this.articleService.getArtilesLikesCount(
    this.article.id
  );

  public articlesCommentsCount: number = this.articleService.getArtilesCommentsCount(this.article.id);

  public articlesSharesCount: number = this.articleService.getArtilesSharesCount(this.article.id);

  public articlesSavesCount: number = this.articleService.getArtilesSavesCount(this.article.id);

  public isPostLiked: boolean = false;
  public isPostSaved: boolean = false;
  public areCommentsShown: boolean = false;
  public newComment: string = '';
  public isLeaveAButtonButtonPressed: boolean = false;

  public updateArticlesLikesCount() {
    this.changeLikeCounterStyles();
    if (!this.isPostLiked)
      this.articlesLikesCount++; // provizoriu, pana modificam in baza de date
    else this.articlesLikesCount--;
    this.isPostLiked = !this.isPostLiked;
  }

  public updateArticlesCommentsCount() {
    this.articlesCommentsCount++; // provizoriu, pana modificam in baza de date
  }

  public updateArticlesSharesCount() {
    this.articlesSharesCount++; // provizoriu, pana modificam in baza de date
  }

  public updateArticlesSavesCount() {
    this.changeSavedCounterStyles();
    if (!this.isPostSaved)
      this.articlesSavesCount++; // provizoriu, pana modificam in baza de date
    else this.articlesSavesCount--;
    this.isPostSaved = !this.isPostSaved;
  }

  public likeCounterStyles = {
    color: this.isPostLiked ? 'red' : 'black',
  };

  public changeLikeCounterStyles() {
    if (!this.isPostLiked) this.likeCounterStyles = { color: 'red' };
    else this.likeCounterStyles = { color: 'black' };
  }

  public savedCounterStyles = {
    color: this.isPostSaved ? 'yellow' : 'black',
  };

  public changeSavedCounterStyles() {
    if (!this.isPostSaved) this.savedCounterStyles = { color: 'yellow' };
    else this.savedCounterStyles = { color: 'black' };
  }

  public showComments(articleId: number) {
    this.areCommentsShown = !this.areCommentsShown;
  }

  public onLeavingComment() {
    this.isLeaveAButtonButtonPressed = true;
  }
}
