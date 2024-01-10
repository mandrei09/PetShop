import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';
import { AddCatModalComponent } from '../addCatModal/addCatModal.component';
import { UserSimpleDetail } from 'src/model/UserSimpleDetail';
import { Article } from 'src/model/Article';
import { ArticleService } from 'src/services/ArticleService/Article.service';
import { UserModalComponent } from '../userModal/userModal.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private router : Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private articleService : ArticleService
  ) 
  { 
    this.userService = userService;
    this.router = router;
    this.dialog = dialog;
    this.activatedRoute = activatedRoute;
    this.articleService = articleService
  }

  public currentUser : User | null = null ;
  public profileUser : User | null = null ; 
  public isFollowButtonShown : boolean = false;
  public areFollowUnfollowButtonsShown : boolean = false;
  public profileUserPosts : Article[] | [] = []
  public totalLikes : number = 0
  public followers : number = 0
  public following : number = 0
  public profileUserId! : string 

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.profileUserId = params['id'];
      if(this.profileUserId)
      {
        this.currentUser = await this.userService.getUser()
        this.profileUser = await this.userService.firebaseGetCurentUser(this.profileUserId)
        this.profileUserPosts = await this.articleService.firebaseGetAllArticlesFromUser(User.toFirebasePath(this.profileUserId!))
        this.totalLikes = this.profileUserPosts.reduce(
          (total, post) => total + (post.likes ? post.likes.length : 0),
          0
        );
        this.followers = this.profileUser!.followers.length
        this.following = this.profileUser!.following.length
        this.isFollowButtonShown = this.showFollowButton()
        this.areFollowUnfollowButtonsShown = this.showFollowUnfollowButtons()
      }
      else
        this.profileUser = null;
    }); 
    
  }

  public createCat(){
    const dialogRef = this.dialog.open(AddCatModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {isAdopted : true}
    });
    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  public viewCatsProfile(catId : string){
    console.log(this.currentUser)
    this.router.navigate(['catProfile/' + catId])
  }

  public showFollowButton(){
    const following = this.currentUser!.following.map((user : UserSimpleDetail) => user.id)
    return !following.includes(this.profileUser!.id)
  }

  public showFollowUnfollowButtons(){
    return this.currentUser?.id != this.profileUser?.id
  }

  public async follow(){
    this.followers ++
    this.currentUser?.following.push(this.profileUser!)
    this.userService.changeFollowing(this.currentUser)
    this.profileUser?.followers.push(this.currentUser!)
    this.userService.changeFollowers(this.profileUser)
    this.isFollowButtonShown = this.showFollowButton()
  }

  public async unfollow(){
    this.followers --
    this.currentUser!.following = this.currentUser!.following.filter(item => item.id != this.profileUser!.id)
    this.userService.changeFollowing(this.currentUser)
    this.profileUser!.followers = this.profileUser!.followers.filter(item => item.id != this.currentUser!.id)
    this.userService.changeFollowers(this.profileUser)
    this.isFollowButtonShown = this.showFollowButton()
  }

  public viewFollowersList(){
    this.openUserModal(this.profileUser!.followers, 'Followers')
  }

  public viewFollowingList(){
    this.openUserModal(this.profileUser!.following, 'Following')
  }

  public openUserModal(users: UserSimpleDetail[], title: string){
    const showButtons = this.currentUser?.id === this.profileUser?.id
    const dialogRef = this.dialog.open(UserModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {users : users, title: title, showButtons : showButtons}
    });
    dialogRef.afterClosed().subscribe(async (data : any) => {
      this.profileUser = await this.userService.firebaseGetCurentUser(this.profileUserId)
      this.followers = this.profileUser!.followers.length
      this.following = this.profileUser!.following.length
    });
  }

}
