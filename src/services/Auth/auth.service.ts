import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { UserService } from '../UserService/User.service';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor
  (
    private router: Router,
    private userService : UserService
  ) 
  {
    this.router = router;
    this.userService = userService;
  }

  isUserLoggedIn: boolean = false;
  isLogin: boolean = false;
  user : User = this.userService.getUser()

  login(userName: string, password: string): Observable<any> {
    this.isUserLoggedIn = userName == this.user.username && password == this.user.password;
    sessionStorage.setItem('STATE',this.isUserLoggedIn ? 'true' : 'false');
    sessionStorage.setItem('ROLE',this.user.role.title)
    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('STATE');
    sessionStorage.removeItem('ROLE')
  }

  isLoggedIn() {
    const loggedIn = sessionStorage.getItem('STATE');
    if (loggedIn == 'true') this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }

  checkAuthentication(): boolean {
    return this.isLoggedIn()
  }

  
}
