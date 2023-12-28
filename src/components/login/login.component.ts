import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/Auth/auth.service';
import { RegisterComponent } from '../register/register.component';
import { PublicFunctions } from 'src/model/PublicFunctions';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   userName: string = ''
   password: string = ''

   @Output() userLoggedIn = new EventEmitter<boolean>

   constructor
   (
      private authService : AuthService, 
      private router : Router,
      private dialog: MatDialog
   ) 
   { 

   }

   ngOnInit() {
      if(PublicFunctions.isKeyInLocalStorage('lastSingedUser.usename'))
      {
         this.userName = localStorage.getItem('lastSingedUser.usename')!
         this.password = localStorage.getItem('lastSingedUser.password')!
      }
   }

   async onClickSubmit() {

      (await this.authService.login(this.userName, this.password))
         .subscribe( data => {
            this.userLoggedIn.emit(true)
            localStorage.setItem('lastSingedUser.usename', this.userName)
            localStorage.setItem('lastSingedUser.password',this.password)
            if(data) this.router.navigate(['news']);
      });
   }

   public onRegister(){
      const dialogRef = this.dialog.open(RegisterComponent, {
         panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
         data: {}
       });
       dialogRef.afterClosed().subscribe((res) => {
         this.userName = localStorage.getItem('lastSingedUser.usename')!
         this.password = localStorage.getItem('lastSingedUser.password')!
       });
   }
}