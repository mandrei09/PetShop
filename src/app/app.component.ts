import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/Auth/auth.service';
import { UserService } from 'src/services/UserService/User.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  title = 'PetShop';
  showLogin = false;

  constructor(
    private userService : UserService,
    private authService : AuthService,
    private router : Router
    )
  {
    this.userService = userService;
    this.authService = authService;
    this.showLogin = sessionStorage.getItem('STATE') === 'true';
    this.router = router; 
  }

  updateUserState(){
    this.showLogin = sessionStorage.getItem('STATE') === 'true';
    
  }
}
