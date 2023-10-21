import { Component, Input, OnInit } from '@angular/core';
import { CustomINavData } from 'src/model/Custom-nav';
import { User } from 'src/model/User';
import { Router } from '@angular/router';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  providers: [UserService]
})
export class FullComponent implements OnInit {

  constructor(private router : Router,
    private userService : UserService) {
    this.router = router;
    this.userService = userService;
  }

  public user : User = this.userService.user; 
  
  public isExpanded = true;
  public isCollapsed = false;

  public customNavItems : CustomINavData[] = [
    {
      badge : undefined,
      children : [
        {
          badge : undefined,
          class : 'mt-2',
          divider : false,
          icon: '',
          name: 'All',
          title : false,
          url : '/news/all',
          variant : '-'
        },
        {
          badge : undefined,
          class : 'mt-2',
          divider : false,
          icon: '',
          name: 'Funny',
          title : false,
          url : '/news/funny',
          variant : '-'
        },
        {
          badge : undefined,
          class : 'mt-2',
          divider : false,
          icon: '',
          name: 'Cute',
          title : false,
          url : '/news/cute',
          variant : '-'
        }
      ],
      class : 'mt-2',
      divider : false,
      icon: 'stars',
      name: 'News',
      title : false,
      url : '/news',
      variant : '-',
    },
    {
      badge : undefined,
      class : 'mt-2',
      divider : false,
      icon: 'pets',
      name: 'Adopt a pet',
      title : false,
      url : '/adopt',
      variant : '-'
    },
    {
      badge : undefined,
      class : 'mt-2',
      divider : false,
      icon: 'face',
      name: 'Contact a specialist',
      title : false,
      url : '/contact',
      variant : '-'
    },
    {
      badge : undefined,
      class : 'mt-2',
      divider : false,
      icon: 'store',
      name: 'Shop',
      title : false,
      url : '/shop',
      variant : '-'
    },
    {
      badge : undefined,
      class : 'mt-2',
      divider : false,
      icon: 'settings',
      name: 'Admin',
      title : false,
      url : '/administrator',
      variant : '-'
    }
  ]

  ngOnInit() {
  }
}
