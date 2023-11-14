import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/model/User';

@Component({
  selector: 'app-modifyUserModal',
  templateUrl: './modifyUserModal.component.html',
  styleUrls: ['./modifyUserModal.component.scss']
})
export class ModifyUserModalComponent implements OnInit {

  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.data = data;
  }

  public selectedUser : User = this.data.parameters

  ngOnInit() {
  }

  public saveUser(){
    
  }
}
