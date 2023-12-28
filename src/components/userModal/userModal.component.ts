import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserSimpleDetail } from 'src/model/UserSimpleDetail';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-userModal',
  templateUrl: './userModal.component.html',
  styleUrls: ['./userModal.component.scss']
})
export class UserModalComponent implements OnInit {

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router : Router,
    private dialogRef: MatDialogRef<UserModalComponent>,
    private userService : UserService

  ) 
  { 
    this.router = router
    this.dialogRef = dialogRef
    this.userService = userService
  }

  public title : string = ''
  public users : UserSimpleDetail[] = []
  public currentUser : User | null = null
  public unfollowButton! : boolean 
  public showButtons! : boolean

  async ngOnInit() {  
    this.currentUser = await this.userService.getUser()
    this.title = this.data.title
    this.users = this.data.users
    this.showButtons = this.data.showButtons
    this.unfollowButton = this.title == 'Following' ? true : false
  }

  public navigateToProfile(id: string) {
    this.dialogRef.close()
    this.router.navigate(['profile/' + id]);
  }

  public closeDialog(){
    this.dialogRef.close()
  }

  public async unfollow(userId : string){
    let userToBeRemoved = await this.userService.firebaseGetCurentUser(userId)
    this.users = this.users.filter(item => item.id != userToBeRemoved!.id)
    this.currentUser!.following = this.currentUser!.following.filter(item => item.id != userToBeRemoved!.id)
    userToBeRemoved!.followers = userToBeRemoved!.followers.filter(item => item.id != this.currentUser!.id)
    await this.userService.changeFollowing(this.currentUser)
    await this.userService.changeFollowers(userToBeRemoved)
  }

  public async removeFromFollow(userId : string){
    let userToBeRemoved = await this.userService.firebaseGetCurentUser(userId)
    this.users = this.users.filter(item => item.id != userToBeRemoved!.id)
    this.currentUser!.followers = this.currentUser!.followers.filter(item => item.id != userToBeRemoved!.id)
    userToBeRemoved!.following = userToBeRemoved!.following.filter(item => item.id != this.currentUser!.id)
    await this.userService.changeFollowing(userToBeRemoved)
    await this.userService.changeFollowers(this.currentUser)
  }
}