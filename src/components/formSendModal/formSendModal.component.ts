import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NotificationService } from 'src/services/NotificationService/Notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formSendModal',
  templateUrl: './formSendModal.component.html',
  styleUrls: ['./formSendModal.component.scss']
})
export class FormSendModalComponent implements OnInit {

  constructor(
    public notificationService: NotificationService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.notificationService = notificationService; 
    this.toastr = toastr;
  }

  ngOnInit() {

  }

  public sendForm(){
    console.log(this.data)
    // this.toastr.success('Your data was sent succesfully!', '')
  }
  
}
