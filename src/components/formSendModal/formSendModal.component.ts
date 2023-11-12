import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-formSendModal',
  templateUrl: './formSendModal.component.html',
  styleUrls: ['./formSendModal.component.scss']
})
export class FormSendModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {

  }

  ngOnInit() {

  }

  public logg(){
    console.log(this.data)
  }

}
