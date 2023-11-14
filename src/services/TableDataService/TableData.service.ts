import { Injectable } from '@angular/core';
import { CatService } from '../CatService/Cat.service';
import { UserService } from '../UserService/User.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

constructor
  (
    private catService : CatService,
    private userService : UserService
  ) 
  {
    this.catService = catService;
    this.userService = userService;
  }

  public getAdoptTableData(){
    return of(this.catService.getCats()[0].owners);
  }

  public getAdministratorTableData(){
    return of(this.userService.getAllUsers());
  }
  
  
}
