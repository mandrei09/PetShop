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

  public user : User | null = null ;

  async ngOnInit() {
    this.user = await this.userService.getUser()
  }

  createCat(){
    const dialogRef = this.dialog.open(AddCatModalComponent, {
      panelClass: 'centered-middle-modal', height: '100%', maxHeight: '100%', disableClose: true, width: '1000px', position: { bottom: '15%', top: 'auto'},
      data: {}
    });
    dialogRef.afterClosed().subscribe((res) => {
    });
  }

  viewCatsProfile(catId : string){
    console.log(this.user)
    this.router.navigate(['catProfile/' + catId])
  }

}
