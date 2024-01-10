import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cat } from 'src/model/Cat';
import { CatService } from 'src/services/CatService/Cat.service';
import { UserService } from 'src/services/UserService/User.service';
import { AddCatModalComponent } from '../addCatModal/addCatModal.component';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss']
})
export class AdoptComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private router : Router,
    private dialog: MatDialog,
    private catService : CatService
  ) 
  { 
    this.userService = userService;
    this.router = router;
    this.dialog = dialog;
    this.catService = catService;
  }

  public unadoptedCats : Cat[] = []

  async ngOnInit() {
    this.unadoptedCats = await this.catService.firebaseGetAllUnadoptedCats()
  }

  public onAddingCat(){
    const dialogRef = this.dialog.open(AddCatModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {isAdopted : false}
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
