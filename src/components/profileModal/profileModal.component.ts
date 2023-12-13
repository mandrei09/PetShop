import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/model/User';
import { AuthService } from 'src/services/Auth/auth.service';
import { UserService } from 'src/services/UserService/User.service';
import { PostsModalComponent } from '../postsModal/postsModal.component';

@Component({
  selector: 'app-profileModal',
  templateUrl: './profileModal.component.html',
  styleUrls: ['./profileModal.component.scss'],
  providers: [UserService]
})
export class ProfileModalComponent implements OnInit {

  constructor
    (
      private userService : UserService,
      private authService : AuthService,
      private dialog: MatDialog
    ) 
  { 
    this.userService = userService;
    this.authService = authService;
    this.dialog = dialog;
  }

  @Output() userLoggedIn = new EventEmitter<boolean>
  public user : User = this.userService.getUser() ;

  ngOnInit() {
  }

  public logout(){
    this.authService.logout()
    this.userLoggedIn.emit(true)
  }

  public onClickLikedPosts(){
    const dialogRef = this.dialog.open(PostsModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {title : 'Liked Posts', methodIndex : 0}
    });
    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  public onClickSavedPosts(){
    const dialogRef = this.dialog.open(PostsModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {title : 'Saved Posts', methodIndex : 1}
    });
    dialogRef.afterClosed().subscribe((res) => {
    });
  }

}
