import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/model/Breed';
import { Cat } from 'src/model/Cat';
import { UserService } from 'src/services/UserService/User.service';


@Component({
  selector: 'app-addCatModal',
  templateUrl: './addCatModal.component.html',
  styleUrls: ['./addCatModal.component.scss']
})
export class AddCatModalComponent implements OnInit {

  constructor
  (
    private userService : UserService
  ) 
  {
    this.userService = userService
  }

  ngOnInit() {
  }

  public user = this.userService.getUser()

  public name! : string;
  public birthDate! : Date;
  public age! : number;
  public breed! : Breed;
  public gender! : string;
  public description! : string;
  public image! : File

  onFileChanged(event : any) {
    this.image = event.target.files[0]
    this.onUploadImage(this.image)
  }

  onUploadImage(image : File){
  // this.http.post('my-backend.com/file-upload', uploadData, {
  //   reportProgress: true,
  //   observe: 'events'
  // })
  //   .subscribe(event => {
  //     console.log(event); // handle event here
  //   });
  }

  createCat(){
    let newCat : Cat = 
    new Cat(
      500,
      this.name,
      this.birthDate,
      this.age,
      this.breed,
      true,
      this.gender,
      //this.image,
      '',
      [this.user],
      this.description)
      
  }

}
