import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/model/Article';
import { Reply } from 'src/model/Reply';
import { User } from 'src/model/User';
import { ArticleService } from 'src/services/ArticleService/Article.service';
import { ReplyService } from 'src/services/ReplyService/Reply.service';
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
    private route: ActivatedRoute,
    private replyService : ReplyService
  ) {
    this.userService = userService;
    this.articleService = articleService;
    this.router = router;
    this.replyService = replyService;
  }

  async ngOnInit(){
    this.user = await this.userService.getUser();
    this.route.params.subscribe(async (params: Params) => {
      this.articleId = params['id']
    });
    this.article = await this.articleService.firebaseGetArticleById(this.articleId);
  }

  ngAfterViewInit(){
    this.articlesLikesCount = this.articleService.getArtilesLikesCount(this.article!)
    this.articlesCommentsCount = this.articleService.getArtilesCommentsCount(this.article!);
    this.articlesSharesCount = this.articleService.getArtilesSharesCount(this.article!);
    this.articlesSavesCount = this.articleService.getArtilesSavesCount(this.article!);
    this.isPostLiked = this.article!.likes.filter(user => user.id === this.user!.id).length !== 0
    this.isPostSaved = this.article!.saves.filter(user => user.id === this.user!.id).length !== 0
    this.initLikeCounterStyles()
    this.initSavedCounterStyles()
  }

  public user: User | null = null
  public articleId : string = ''
  public article : Article | null = null
  public articlesLikesCount!: number
  public articlesCommentsCount!: number
  public articlesSharesCount!: number
  public articlesSavesCount!: number

  public navigateToProfile(id: string) {
    this.router.navigate(['profile/' + id]);
  }

  public isPostLiked!: boolean
  public isPostSaved: boolean = false;
  public areCommentsShown: boolean = false;
  public newComment: string = '';
  public isLeaveAButtonButtonPressed: boolean = false;
  public isEditCommentButtonPressed: boolean = false;
  public selectedCommentIndex! : number;

  public async updateArticlesLikesCount() {
    this.changeLikeCounterStyles();
    if (!this.isPostLiked)
    {
      this.articlesLikesCount++; 
      await this.articleService.addLikeToPost(this.article,User.toFirebasePath(this.user!.id))
    }
    else 
    {
      this.articlesLikesCount--;
      await this.articleService.removeLikeFromPost(this.article,User.toFirebasePath(this.user!.id))

    }
    this.isPostLiked = !this.isPostLiked;
  }

  public updateArticlesSharesCount() {
    this.articlesSharesCount++; 
  }

  public async updateArticlesSavesCount() {
    this.changeSavedCounterStyles();
    if (!this.isPostSaved)
    {
      this.articlesSavesCount++; 
      await this.articleService.addSaveToPost(this.article,User.toFirebasePath(this.user!.id))

    }
    else
    {
      this.articlesSavesCount--;
      await this.articleService.removeSaveFromPost(this.article,User.toFirebasePath(this.user!.id))

    }
    this.isPostSaved = !this.isPostSaved;
  }

  public likeCounterStyles = {
    color: this.isPostLiked ? 'red' : 'black',
  };

  public initLikeCounterStyles() {
    if (this.isPostLiked) this.likeCounterStyles = { color: 'red' };
    else this.likeCounterStyles = { color: 'black' };
  }

  public changeLikeCounterStyles() {
    if (!this.isPostLiked) this.likeCounterStyles = { color: 'red' };
    else this.likeCounterStyles = { color: 'black' };
  }

  public savedCounterStyles = {
    color: this.isPostSaved ? 'yellow' : 'black',
  };

  public initSavedCounterStyles() {
    if (this.isPostSaved) this.savedCounterStyles = { color: 'yellow' };
    else this.savedCounterStyles = { color: 'black' };
  }

  public changeSavedCounterStyles() {
    if (!this.isPostSaved) this.savedCounterStyles = { color: 'yellow' };
    else this.savedCounterStyles = { color: 'black' };
  }

  public showComments(articleId: string) {
    this.areCommentsShown = !this.areCommentsShown;
  }

  public async onLeavingComment() {
    this.isLeaveAButtonButtonPressed = true;
    if(this.newComment!=='')
    {
      const newComment = new Reply('',this.user,new Date(),this.newComment)
      const newCommentId = await this.replyService.addReplytoFirebase(newComment)
      await this.replyService.addReplyToArticle(this.article,Reply.toFirebasePath(newCommentId!)) 
      this.article = await this.articleService.firebaseGetArticleById(this.articleId);
      this.newComment = ''
    }
  }

  public onEditComment(index : number){
    this.isLeaveAButtonButtonPressed = true
    this.isEditCommentButtonPressed = !this.isEditCommentButtonPressed
    this.newComment = this.article!.comments[index].content
    this.selectedCommentIndex = index
  }

  public async editComment(){
    this.article!.comments[this.selectedCommentIndex].content = this.newComment
    await this.replyService.updateReply(this.article!.comments[this.selectedCommentIndex])
    this.isEditCommentButtonPressed = !this.isEditCommentButtonPressed
    this.newComment = ''
    this.isLeaveAButtonButtonPressed = !this.isLeaveAButtonButtonPressed
  }

  public async onDeleteComment(commentId : string){
    this.article!.comments = this.article!.comments.filter(item => item.id != commentId)
    await this.replyService.deleteReplyFromArticle(this.article)
    await this.replyService.deleteReplyFromFirebase(commentId)
    this.articlesCommentsCount --
  }

  public onDeletingPost(){
    this.articleService.deleteArticleFromFirebase(this.articleId)
    this.replyService.deleteAllRepliesFromArticleFromFirebase(this.article!.comments)
    this.router.navigate(["/news"])
  }
}
