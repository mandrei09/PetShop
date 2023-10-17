import { Component, OnInit } from '@angular/core';
import { Article } from 'src/model/Article';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-articleDetail',
  templateUrl: './articleDetail.component.html',
  styleUrls: ['./articleDetail.component.scss'],
  providers: [UserService]
})
export class ArticleDetailComponent implements OnInit {

  constructor(private userService : UserService) { 
    this.userService = userService;
  }

  public user : User = this.userService.user;

  public article : Article = 
    {
      id : 1,
      title : 'Titlu 1',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user,
      date : new Date('2023-10-16')
    };

  ngOnInit() {
  }

}
