import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cat } from 'src/model/Cat';
import { User } from 'src/model/User';
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
        this.user = await this.userService.getUser()
        await this.setCanYouAdoptCat()
        await this.setCanYouUnadoptCat()
        await (await this.tableDataService.getAdoptTableData(this.cat)).subscribe(res => {
          res.map(item => {
            this.tableData.push(item)
          });
        });
      }
      else
        this.cat = null;
    }); 
  }

  public user : User | null = null
  public cat : Cat | null = null
  public tableData : any[] = []
  public columnHeader = this.tableHeaderService.getCatOwnersHeader();
  public canYouAdoptCat : boolean = false
  public canYouUnadoptCat : boolean = false

  async setCanYouAdoptCat(){
    this.canYouAdoptCat = !this.user!.cats!.length && !this.cat!.isAdopted 
      && !this.user!.cats.filter((cat : Cat) => cat.id === this.cat!.id).length
  }

  async setCanYouUnadoptCat(){
    this.canYouUnadoptCat = this.user!.cats.filter((cat : Cat) => cat.id === this.cat!.id).length === 1
  }
  
  public async adoptCat(){
    this.cat!.isAdopted = true;
    this.canYouAdoptCat = false
    this.canYouUnadoptCat = true 
    await this.catService.adoptCat(this.cat!.id,true)
    await this.userService.addCatToUser(this.user, Cat.toFirebasePath(this.cat!.id))
  }

   public async unadoptCat(){
    this.cat!.isAdopted = false;
    this.canYouAdoptCat = true
    this.canYouUnadoptCat = false 
    await this.catService.adoptCat(this.cat!.id,false)
    await this.userService.deleteCatFromUser(this.user)
    await this.catService.addOwnerToCat(this.cat,User.toFirebasePath(this.user!.id))
  }
}
