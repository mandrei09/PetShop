import { Component, OnInit } from '@angular/core';
import { Article } from 'src/model/Article';
import { User } from 'src/model/User';

@Component({
  selector: 'app-articleDetail',
  templateUrl: './articleDetail.component.html',
  styleUrls: ['./articleDetail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  public id: number = 0; 

  public testUser : User = new User('1','andrei-alexandru.mihai@gmail.com','mandrei09',['admin']);

  public article : Article = 
    {
      id : 1,
      title : 'Titlu 1',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.testUser,
      date : new Date('2023-10-16')
    };

  constructor() { }

  ngOnInit() {
  }

}
