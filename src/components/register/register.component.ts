import { Component, OnInit } from '@angular/core';
import { Role } from 'src/model/Role';
import { User } from 'src/model/User';
import { Location } from 'src/model/Location';
import { Article } from 'src/model/Article';
import { Cat } from 'src/model/Cat';
import { References } from 'src/model/References';
import { PublicFunctions } from 'src/model/PublicFunctions';
import { UserService } from 'src/services/UserService/User.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private router : Router,

  ) 
  { 
    this.userService = userService
    this.dialogRef = dialogRef
    this.router = router
  }

  ngOnInit() {
  }

  public email : string = ''
  public phoneNumber : string = ''
  public username : string = ''
  public password : string = ''
  public birthDate! : Date 
  public locationState : string = '' 
  public locationCity : string = '' 
  public locationAddress : string = '' 
  public role : Role = new Role('0','User')
  public profilePhoto : string = ''
  public image! : File
  public followers: User[] = [];
  public following: User[] = [];
  public posts: Article[] = [];
  public cats: Cat[] = []
  public profileDescription : string = ''

  public onFileChanged(event : any) {
    this.image = event.target.files[0]
  }


  public async createUser(){
    let location  : Location = new Location('',this.locationState,this.locationCity,this.locationAddress)
    let imagePath, downloadURL 
    if(this.image!=undefined)
    {
      imagePath = References.usersPhotosRef + this.image.name
      downloadURL = await PublicFunctions.onUploadImage(this.image,imagePath)
    }
    else 
      downloadURL = await PublicFunctions.getDownloadURL(References.genericProfilePhoto)

    let newUser : User = 
      new User(
        '',
        this.email,
        this.phoneNumber,
        this.username,
        this.password,
        this.birthDate,
        this.role,
        location,
        this.followers,
        this.following,
        this.cats,
        downloadURL,
        this.profileDescription
      )

    await this.userService.addUserToFirebase(newUser) 
    localStorage.setItem('lastSingedUser.usename', this.username)
    localStorage.setItem('lastSingedUser.password',this.password)
    this.dialogRef.close({username : this.username, password : this.password })
  }
}
