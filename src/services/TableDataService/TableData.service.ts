import { Injectable } from '@angular/core';
import { CatService } from '../CatService/Cat.service';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

constructor(private catService : CatService) {
  this.catService = catService;
}
  tableData : any [] = this.catService.getCats()[0].owners;
  
}
