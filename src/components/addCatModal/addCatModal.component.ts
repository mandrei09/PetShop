import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/model/Breed';
import { Cat } from 'src/model/Cat';
import { UserService } from 'src/services/UserService/User.service';
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { ConfigAPI} from 'src/model/ConfigAPI'
import { BreedService } from 'src/services/BreedService/Breed.service';
import { Gender } from 'src/model/Gender';
import { GenderService } from 'src/services/GenderService/Gender.service';
import { References } from 'src/model/References';
import { PublicFunctions } from 'src/model/PublicFunctions';
import { User } from 'src/model/User';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CatService } from 'src/services/CatService/Cat.service';

@Component({
  selector: 'app-addCatModal',
  templateUrl: './addCatModal.component.html',
  styleUrls: ['./addCatModal.component.scss']
})
export class AddCatModalComponent implements OnInit {

  constructor
  (
    private userService : UserService,
    private breedService : BreedService,
    private genderService : GenderService,
    private catService : CatService,
    private router : Router,
    public dialogRef: MatDialogRef<AddCatModalComponent>
  ) 
  {
    this.userService = userService
    this.breedService = breedService
    this.genderService = genderService
    this.router = router;
    this.dialogRef = dialogRef;
    this.catService = catService;
  }

  async ngOnInit() {
    this.breeds = await this.breedService.firebaseGetAllBreeds()
    this.genders = await this.genderService.firebaseGetAllGenders()
    this.user = await this.userService.getUser()
  }

  
  public user : User | null = null;  
  public breeds : Breed[] = []
  public genders : Gender[] = []

  public name! : string;
  public birthDate! : Date;
  public age! : number;
  public breed! : Breed;
  public gender! : Gender;
  public description! : string;
  public image! : File

  onFileChanged(event : any) {
    this.image = event.target.files[0]
  }

  async createCat(){
    let imagePath 
    if(this.image!=undefined)
      imagePath = References.catsPhotosRef + this.image.name
    else 
      imagePath = References.genericProfilePhoto
    const downloadURL = await PublicFunctions.onUploadImage(this.image,imagePath)
    let newCat : Cat = 
      new Cat(
        '',
        this.name,
        this.birthDate,
        this.age,
        this.breed,
        true,
        this.gender,
        downloadURL,
        [this.user],
        this.description)
    
    const newCatId = await this.catService.addCattoFirebase(newCat)
    await this.userService.addCatToUser(this.user,Cat.toFirebasePath(newCatId!)) 
    this.dialogRef.close()
    this.router.navigate(['catProfile/' + newCatId])
  }
  

}
