import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { AuthService } from 'src/services/Auth/auth.service';
import { UserService } from 'src/services/UserService/User.service';

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
      private authService : AuthService
    ) 
  { 
    this.userService = userService;
    this.authService = authService;
  }

  public user : User = this.userService.getUser() ;

  ngOnInit() {
  }

  public logout(){
    this.authService.logout()
  }

}
