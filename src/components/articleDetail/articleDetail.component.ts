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

  async ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.articleId = params['id']; 
    });
    //this.article = this.articleService.getArticle(this.articleId);
    this.articlesLikesCount = this.articleService.getArtilesLikesCount(this.article.id)
    this.articlesCommentsCount = this.articleService.getArtilesCommentsCount(this.article.id);
    this.articlesSharesCount = this.articleService.getArtilesSharesCount(this.article.id);
    this.articlesSavesCount = this.articleService.getArtilesSavesCount(this.article.id);
    this.user = await this.userService.getUser();
  }

  public user: User | null = null
  public articleId!: string;
  public article! : Article
  public articlesLikesCount!: number
  public articlesCommentsCount!: number
  public articlesSharesCount!: number
  public articlesSavesCount!: number

  public navigateToProfile(id: string) {
    this.router.navigate(['profile/' + id]);
  }

  public isPostLiked: boolean = false;
  public isPostSaved: boolean = false;
  public areCommentsShown: boolean = false;
  public newComment: string = '';
  public isLeaveAButtonButtonPressed: boolean = false;
  public isEditCommentButtonPressed: boolean = false;
  public selectedCommentIndex! : number;

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

  public showComments(articleId: string) {
    this.areCommentsShown = !this.areCommentsShown;
  }

  public onLeavingComment() {
    this.isLeaveAButtonButtonPressed = true;
    if(this.newComment!=='')
    {
      let comment = new Reply('1000',this.user,new Date(),this.newComment)
      //this.articleService.addComment(this.articleId,comment)
      this.articlesCommentsCount = this.articleService.getArtilesCommentsCount(this.article.id);
      this.newComment = ''
    }
  }

  public onEditComment(index : number){
    this.isLeaveAButtonButtonPressed = true
    this.isEditCommentButtonPressed = !this.isEditCommentButtonPressed
    this.newComment = this.article.comments[index].content
    this.selectedCommentIndex = index
  }

  public editComment(){
    this.article.comments[this.selectedCommentIndex].content = this.newComment
    this.isEditCommentButtonPressed = !this.isEditCommentButtonPressed
    this.newComment = ''
    this.isLeaveAButtonButtonPressed = !this.isLeaveAButtonButtonPressed
  }

  public onDeleteComment(commentId : string){
    this.article.comments = this.article.comments.filter(item => item.id != commentId)
    this.articlesCommentsCount --
  }

  public onDeletingPost(){
    this.articleService.deleteArticle(this.articleId)
    this.router.navigate(["/news"])
  }
}
