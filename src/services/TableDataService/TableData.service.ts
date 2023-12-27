import { Injectable } from '@angular/core';
import { CatService } from '../CatService/Cat.service';
import { UserService } from '../UserService/User.service';
import { of } from 'rxjs';
import { Cat } from 'src/model/Cat';

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

   public async getAdoptTableData(cat : Cat | null){
    if(cat)
      return await of(cat.owners);
    else
      return await of([])
  }

  public async getAdministratorTableData(){
    return await of(this.userService.firebaseGetAllUsers());
  }
  
  
}
