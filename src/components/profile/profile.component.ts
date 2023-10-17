import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user : User = new User('1','andrei-alexandru.mihai@gmail.com','mandrei09',['admin']);


  constructor() { }

  ngOnInit() {
  }

}
