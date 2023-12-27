import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomINavData } from 'src/model/Custom-nav';
import { User } from 'src/model/User';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from 'src/services/UserService/User.service';
import { AuthGuard } from 'src/app/auth.guard';
import { RoleService } from 'src/services/RoleService/Role.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  providers: [UserService]
})
export class FullComponent implements OnInit {
  

  constructor(private router : Router,
    private userService : UserService,
    private activatedRoute : ActivatedRoute,
    private roleService : RoleService) {
    this.router = router;
    this.userService = userService;
    this.activatedRoute = activatedRoute;
    this.roleService = roleService;
  }

  async ngOnInit() {
    this.user = await this.userService.getUser();
  }

  ngAfterViewInit(){
    this.customNavItems = [
      {
        badge : undefined,
        class : 'mt-2',
        divider : false,
        icon: 'stars',
        name: 'News',
        title : false,
        url : '/news',
        variant : '-',
        component : 'ArticlesComponent'
      },
      {
        badge : undefined,
        class : 'mt-2',
        divider : false,
        icon: 'pets',
        name: 'Adopt a pet',
        title : false,
        url : '/adopt',
        variant : '-',
        component : 'AdoptComponent'
      },
      {
        badge : undefined,
        class : 'mt-2',
        divider : false,
        icon: 'face',
        name: 'Contact a specialist',
        title : false,
        url : '/contact',
        variant : '-',
        component : 'ContactComponent'
      },
      {
        badge : undefined,
        class : 'mt-2',
        divider : false,
        icon: 'report_problem',
        name: 'Problems',
        title : false,
        url : '/problems',
        variant : '-',
        component : 'ProblemsComponent'
      },
      {
        badge : undefined,
        class : 'mt-2',
        divider : false,
        icon: 'settings',
        name: 'Admin',
        title : false,
        url : '/administrator',
        variant : '-',
        component : 'AdministratorComponent'
      }
    ]
  }

  public user : User | null = null 
  @Output() userLoggedIn = new EventEmitter<boolean>
  public customNavItems : CustomINavData[] = []

  public isExpanded = true;
  public isCollapsed = false;

  public canNavItemBeDisplayed(sidebarnavItem : CustomINavData){
    return this.roleService
      .getComponentAccesRoles(sidebarnavItem.component)
      .includes(sessionStorage.getItem("ROLE")!) 
  }

  public searchBarInput : string = '' ;

  modifySearchInput(event: string) {
    this.searchBarInput = event;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { search: this.searchBarInput },
      queryParamsHandling: 'merge',
    });
  }
  
  updateUserState(){
    this.userLoggedIn.emit(true)
  }

}
