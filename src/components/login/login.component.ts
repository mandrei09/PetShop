import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/Auth/auth.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   userName: string = ''
   password: string = ''
   formData!: FormGroup

   @Output() userLoggedIn = new EventEmitter<boolean>

   constructor(private authService : AuthService, private router : Router) { }

   ngOnInit() {
      this.formData = new FormGroup({
         userName: new FormControl("m_andrei09"),
         password: new FormControl("admin09"),
      });
   }

   async onClickSubmit(data: any) {
      this.userName = data.userName;
      this.password = data.password;
      (await this.authService.login(this.userName, this.password))
         .subscribe( data => { 
            this.userLoggedIn.emit(true)
            if(data) this.router.navigate(['news']); 
      });
   }
}