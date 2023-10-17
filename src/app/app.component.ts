import { Component } from '@angular/core';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'PetShop';

  constructor(private userService : UserService){
    this.userService = userService;
  }
}
