import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { RoleService } from 'src/services/RoleService/Role.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/model/Role';

@Component({
  selector: 'app-modifyUserModal',
  templateUrl: './modifyUserModal.component.html',
  styleUrls: ['./modifyUserModal.component.scss']
})
export class ModifyUserModalComponent implements OnInit {

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService : RoleService,
    private router : Router,
    public dialogRef: MatDialogRef<ModifyUserModalComponent>
  ) 
  {
    this.data = data;
    this.roleService = roleService;
    this.router = router;
    this.dialogRef = dialogRef;
  }

  public roles : Role[] = []
  public newRole! : Role

  public selectedUser : User = this.data.parameters

  async ngOnInit() {
    this.roles = await this.roleService.firebaseGetAllRoles()
  }

  public navigateToProfile(id : string){
    this.dialogRef.close()
    this.router.navigate(['profile/' + id])
  }

  public onSaveUser(){
    const data = { actionType: 'Save', updatedRole: Role.toFirebasePath(this.newRole.id) };
    this.dialogRef.close(data)
  }

  public onDeleteUser(){
    const data = { actionType: 'Delete', selectedUserId: this.selectedUser.id };
    this.dialogRef.close(data)
  }
}

