// auth.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "src/services/Auth/auth.service";
;

@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (this.authService.checkAuthentication()) 
      {
        return true;
      } 
      else 
      {
        this.router.navigate(["/login"]); 
        return false;
      }
   }
}
