import { Component } from '@angular/core';
import { User } from 'src/classes/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'PetShop';

  user : User = new User('da@gmail.com','Proba');
}
