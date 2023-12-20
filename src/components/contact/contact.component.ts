import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Cat } from 'src/model/Cat';
import { Parameter } from 'src/model/Parameter';
import { User } from 'src/model/User';
import { ProblemsService } from 'src/services/ProblemsService/Problems.service';
import { UserService } from 'src/services/UserService/User.service';
import { FormSendModalComponent } from '../formSendModal/formSendModal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private userService : UserService,
    private problemsService : ProblemsService,
    public dialog: MatDialog) 
  {
    this.userService = userService;
    this.problemsService = problemsService;
    this.dialog = dialog;
  }

  public user : User | null = null

  public problems : string[] = this.problemsService.getProblems();

  public selectedProblem : string = ''
  public selectedProblemInput : string = ''
  public selectedPet! : Cat
  public selectedDate!: Date;
  public otherProblemInput!: string;
  public otherDetailsInput!: string;


  async ngOnInit() {
    this.user = await this.userService.getUser()
  }

  onFormSending(){
    const dialogRef = this.dialog.open(FormSendModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '81%', disableClose: true, width: '700px', position: { bottom: '15%', top: 'auto'},
      data: {parameters : this.getFilters()}
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.sendForm();
    });
  }

  public getFilters(){
    let formParams = new Array<Parameter>
    formParams.push(new Parameter('catName',this.selectedPet.name))
    if(this.selectedProblem!=='Other Reason')
      formParams.push(new Parameter('selectedProblem',this.selectedProblem))
    else 
      formParams.push(new Parameter('selectedProblem',this.otherProblemInput))
    formParams.push(new Parameter('selectedDate',this.selectedDate.toString()))
    if(this.otherDetailsInput!=='')
      formParams.push(new Parameter('otherDetails',this.otherDetailsInput))

    return formParams;
  }
}
