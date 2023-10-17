import { Component } from '@angular/core';
import { User } from 'src/model/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'PetShop';
  
  public user : User = new User('1','andrei-alexandru.mihai@gmail.com','mandrei09',['admin']);
}
