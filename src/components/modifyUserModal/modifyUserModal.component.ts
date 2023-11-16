import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { RoleService } from 'src/services/RoleService/Role.service';
import { MatDialogRef } from '@angular/material/dialog';

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

  public roles : any[] = []
  public newRole : string = ''


  public selectedUser : User = this.data.parameters

  ngOnInit() {
    this.roles=this.roleService.getRoles()
  }

  public navigateToProfile(id : string){
    this.dialogRef.close()
    this.router.navigate(['profile/' + id])
  }

  public saveUser(){
    
  }

  onDeleteUser(){
    /*
    De adaugat: 
      userId
      email
        pe o singura linie
          centrate cu tot cu butonul de modificare rol
      de pus cele 3 butoane jos 
      de facut functiile de delete si save user.
    */
  }
}
