import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Problem } from 'src/model/Problem';
import { UserService } from 'src/services/UserService/User.service';
import { User } from 'src/model/User';
import { ProblemsService } from 'src/services/ProblemsService/Problems.service';

@Component({
  selector: 'app-formSendModal',
  templateUrl: './formSendModal.component.html',
  styleUrls: ['./formSendModal.component.scss']
})
export class FormSendModalComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private problemService : ProblemsService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<FormSendModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.userService = userService
    this.problemService = problemService
    this.toastr = toastr;
    this.dialogRef = dialogRef;
  }

  public user : User | null = null
  public newProblem! : Problem 

  async ngOnInit() {
    this.user = await this.userService.getUser()
    this.newProblem = this.data.formData
  }

  public async sendForm(){
    const newProblemId = await this.problemService.addProblemToFirebase(this.newProblem)
    this.dialogRef.close()
  }
  
}
