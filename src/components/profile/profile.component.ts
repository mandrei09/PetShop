import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  constructor(public userService : UserService) { 
    this.userService = userService;
  }

  public user : User = this.userService.getUser() ;

  ngOnInit() {
  }

}
