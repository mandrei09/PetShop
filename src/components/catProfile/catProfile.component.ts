import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/model/Cat';
import { CatService } from 'src/services/CatService/Cat.service';
import { TableDataService } from 'src/services/TableDataService/TableData.service';
import { TableHeaderService } from 'src/services/TableHeaderService/TableHeader.service';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-catProfile',
  templateUrl: './catProfile.component.html',
  styleUrls: ['./catProfile.component.scss']
})
export class CatProfileComponent implements OnInit {

  constructor(
    private catService : CatService, 
    private userService : UserService, 
    private tableDataService : TableDataService,
    private tableHeaderService : TableHeaderService) {
      this.catService = catService;
      this.userService = userService;
      this.tableDataService = tableDataService;
      this.tableHeaderService = tableHeaderService;
  }

  public cat : Cat = this.catService.getCats()[0];
  public tableData : any[] = []
  public columnHeader = this.tableHeaderService.getCatOwnersHeader();
  

  public adoptCat(){
    this.cat.isAdopted = true;
    this.cat.owners.push(this.userService.getUser())
    //this.tableData = this.cat.owners;
    // De deshis modalul bla bla
  }

  ngOnInit() {
    this.tableDataService.getAdoptTableData().subscribe(res => {
      res.map(item => {
        this.tableData.push(item)
      });
    });
  }

}
