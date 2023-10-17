import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-profileModal',
  templateUrl: './profileModal.component.html',
  styleUrls: ['./profileModal.component.scss'],
  providers: [UserService]
})
export class ProfileModalComponent implements OnInit {

  constructor(public userService : UserService) { 
    this.userService = userService;
  }

  public user : User = this.userService.user ;

  ngOnInit() {
  }

}
