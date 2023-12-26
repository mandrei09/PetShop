import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private tableHeaderService : TableHeaderService,
    private activatedRoute: ActivatedRoute) {
      this.catService = catService;
      this.userService = userService;
      this.tableDataService = tableDataService;
      this.tableHeaderService = tableHeaderService;
      this.activatedRoute = activatedRoute;
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const catId = params['id'];
      if(catId)
      {
        this.cat = await this.catService.firebaseGetCatById(catId)
        this.tableDataService.getAdoptTableData(this.cat).subscribe(res => {
          res.map(item => {
            this.tableData.push(item)
          });
        });
      }
      else
        this.cat = null;
    });

  }

  public cat : Cat | null = null
  public tableData : any[] = []
  public columnHeader = this.tableHeaderService.getCatOwnersHeader();
  

  public adoptCat(){
    this.cat!.isAdopted = true;
    //this.cat.owners.push(this.userService.getUser())
    //this.tableData = this.cat.owners;
    // De deshis modalul bla bla
  }

  

}
