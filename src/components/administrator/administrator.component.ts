import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableDataService } from 'src/services/TableDataService/TableData.service';
import { TableHeaderService } from 'src/services/TableHeaderService/TableHeader.service';
import { UserService } from 'src/services/UserService/User.service';
import { ModifyUserModalComponent } from '../modifyUserModal/modifyUserModal.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(
    private tableHeaderService : TableHeaderService,
    private tableDataService : TableDataService,
    private userService : UserService,
    private dialog: MatDialog
    ) 
  { 
    this.tableHeaderService = tableHeaderService;
    this.tableDataService = tableDataService;
    this.userService = userService;
    this.dialog = dialog;
  }

  public tableData : any[] = []
  public columnHeader = this.tableHeaderService.getUserTableHeader()
  public selectedItems : any = []

  async ngOnInit() {
     (await this.tableDataService.getAdministratorTableData()).subscribe(async res => {
      (await res).map(item => {
        this.tableData.push(item)
      });
    });
  }

  public changeSelectedItems(items : any[]){
    this.selectedItems = items;
  }

  public onModify(){
    const dialogRef = this.dialog.open(ModifyUserModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '80%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {parameters : this.selectedItems[0]}
    });
    dialogRef.afterClosed().subscribe(async (res) => {
      if(res.actionType==='Save'){
        await this.userService.updateRole(this.selectedItems[0].id,res.updatedRole)
      }
      else
        if(res.actionType==='Delete'){
          await this.userService.deleteUserFromFirebase(this.selectedItems[0].id)
        }
    });
  }
}

