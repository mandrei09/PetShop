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

  async login(userName: string, password: string): Promise<Observable<any>> {
    this.userService.setCurrentUser(userName,password)
    const user = await this.userService.getUser()
    this.isUserLoggedIn = user != null && user!= undefined;
    sessionStorage.setItem('STATE',this.isUserLoggedIn ? 'true' : 'false');
    sessionStorage.setItem('ROLE',user!.role!.title)
    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('STATE')
    sessionStorage.removeItem('ROLE')
    sessionStorage.removeItem('USERID')
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
