import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  isLogin: boolean = false;

  login(userName: string, password: string): Observable<any> {
    // console.log(userName);
    // console.log(password);
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    localStorage.setItem('STATE', this.isUserLoggedIn ? 'true' : 'false');

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap((val) => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    // localStorage.removeItem('STATE');
    localStorage.setItem("STATE",'false') 
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true') this.isLogin = true;
    else this.isLogin = false;
    return this.isLogin;
  }

  checkAuthentication(): boolean {
    return this.isLoggedIn();
  }

  constructor(private router: Router) {
    this.router = router;
  }
}
