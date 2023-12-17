import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { UserService } from 'src/services/UserService/User.service';
import { AddCatModalComponent } from '../addCatModal/addCatModal.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private router : Router,
    private dialog: MatDialog
  ) 
  { 
    this.userService = userService;
    this.router = router;
    this.dialog = dialog;
  }

  public user : User = this.userService.getUser() ;

  ngOnInit() {
  }

  createCat(){
    const dialogRef = this.dialog.open(AddCatModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {}
    });
    dialogRef.afterClosed().subscribe((res) => {
      // this.viewCatsProfile(res.id)
    });
  }

  viewCatsProfile(catId : number){
    this.router.navigate(['catProfile/' + catId])
  }

}
