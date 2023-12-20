// auth.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { User } from "src/model/User";
import { AuthService } from "src/services/Auth/auth.service";
import { UserService } from "src/services/UserService/User.service";
;

@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, 
      private router: Router,
      private userService : UserService) {
         this.userService = userService;
         this.router = router;
      }
      
   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (this.authService.checkAuthentication() && next.data["roles"].includes(sessionStorage.getItem("ROLE")) ) 
      {
        return true;
      } 
      else 
      {
        return false;
      }
   }
}
