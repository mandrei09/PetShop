import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cat } from 'src/model/Cat';
import { User } from 'src/model/User';
import { ProblemsService } from 'src/services/ProblemsService/Problems.service';
import { UserService } from 'src/services/UserService/User.service';
import { FormSendModalComponent } from '../formSendModal/formSendModal.component';
import { Problem } from 'src/model/Problem';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    private userService: UserService,
    private problemsService: ProblemsService,
    public dialog: MatDialog
  ) {
    this.userService = userService;
    this.problemsService = problemsService;
    this.dialog = dialog;
  }

  public user: User | null = null;

  public problems: string[] = this.problemsService.getProblems();

  public selectedProblem: string = '';
  public selectedProblemInput: string = '';
  public selectedPet!: Cat;
  public selectedDate!: Date;
  public otherProblemInput!: string;
  public otherDetailsInput!: string;

  async ngOnInit() {
    this.user = await this.userService.getUser();
  }

  onFormSending() {
    const dialogRef = this.dialog.open(FormSendModalComponent, {
      panelClass: 'centered-middle-modal',
      height: '100%',
      maxHeight: '81%',
      disableClose: true,
      width: '700px',
      position: { bottom: '15%', top: 'auto' },
      data: { formData: this.getProblem() },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  public getProblem() {
    const newProblem: Problem = new Problem(
      '',
      this.user,
      this.user!.cats[0],
      this.selectedProblem !== 'Other Reason'
        ? this.selectedProblem
        : this.otherProblemInput,
      this.selectedDate,
      this.otherDetailsInput
    );

    return newProblem;
  }
}
