import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/model/Article';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [UserService]
})
export class ArticlesComponent implements OnInit {

  constructor(private userService : UserService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { 
    this.userService = userService;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  @Input() inProfile : boolean = false;
  public searchBarInput : string | null = '';

  public user : User = this.userService.getUser();  
  public articles : Article[] = [
    {
      id : 1,
      title : 'Titlu 1',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user,
      date : new Date('2023-10-21')
    },
    {
      id : 2,
      title : 'Titlu 2',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user
    },
    {
      id : 3,
      title : 'Titlu 3',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user
    },
    {
      id : 4,
      title : 'Titlu 3',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user
    },
    {
      id : 5,
      title : 'Titlu 3',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user
    },
    {
      id : 6,
      title : 'Titlu 3',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user
    },
    {
      id : 7,
      title : 'Titlu 1',
      image : 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-jumbo.jpg?quality=75&auto=webp',
      content : 'Content 1',
      user : this.user
    }
  ]

  navigateToProfile(id : string){
    this.router.navigate(['profile/' + id])
  }

  ngOnInit() { //Asta se adauga pentru fiecare componenta unde vrei sa faci search.
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.searchBarInput = queryParams.get('search');
    });
  }
  

}
