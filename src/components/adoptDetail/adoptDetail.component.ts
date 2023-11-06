import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/model/Cat';
import { CatService } from 'src/services/CatService/Cat.service';
import { TableDataService } from 'src/services/TableDataService/TableData.service';
import { TableHeaderService } from 'src/services/TableHeaderService/TableHeader.service';
import { UserService } from 'src/services/UserService/User.service';

@Component({
  selector: 'app-adoptDetail',
  templateUrl: './adoptDetail.component.html',
  styleUrls: ['./adoptDetail.component.scss']
})
export class AdoptDetailComponent implements OnInit {

  constructor(private catService : CatService, private userService : UserService, private tableDataService : TableDataService) {
    this.catService = catService;
    this.userService = userService;
    this.tableDataService = tableDataService;
  }

  public cat : Cat = this.catService.getCats()[0];
  public tableData : any[] = []

  public adoptCat(){
    this.cat.isAdopted = true;
    this.cat.owners.push(this.userService.getUser())
    // De deshis modalul bla bla
  }

  ngOnInit() {
    // // Apply condition on edit and delete button
    // this.tableDataService.getList().subscribe(res => {
    //   this.tableData = res.map((item: any) => {
    //     return item;
    //   });
    // });
  }

}
