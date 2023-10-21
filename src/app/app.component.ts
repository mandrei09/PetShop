import { Component } from '@angular/core';
import { AuthService } from 'src/services/Auth/auth.service';
import { UserService } from 'src/services/UserService/User.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'PetShop';

  constructor(
    private userService : UserService,
    private authService : AuthService
    ){
      this.userService = userService;
      this.authService = authService;
  }
}
