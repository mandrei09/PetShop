import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/model/Breed';
import { Cat } from 'src/model/Cat';
import { UserService } from 'src/services/UserService/User.service';
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { ConfigAPI} from 'src/model/ConfigAPI'
import { BreedService } from 'src/services/BreedService/Breed.service';
import { Gender } from 'src/model/Gender';
import { GenderService } from 'src/services/GenderService/Gender.service';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { HttpHeaders } from '@angular/common/http';

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
    private genderService : GenderService
  ) 
  {
    this.userService = userService
    this.breedService = breedService
    this.genderService = genderService
  }

  async ngOnInit() {
    this.breeds = await this.breedService.firebaseGetAllBreeds()
    this.genders = await this.genderService.firebaseGetAllGenders()
  }

  
  public user = this.userService.getUser()
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

  onUploadImage(image : File){
    const storage = getStorage();
    const storageRef = ref(storage,'images/' + image.name);
    const metadata = {
      contentType: 'image/jpeg',
    };

    
    
    uploadBytes(storageRef,image,metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  

  public async addCattoFirebase(cat: Cat) {
    try {
      const catData = Cat.toFirebase(cat); 
      const catsCollectionRef = collection(ConfigAPI.db, 'Cats');
      const newCatRef = await addDoc(catsCollectionRef, catData);

    } catch (error) {
      console.error('Error adding cat: ', error);
    }
  }

  createCat(){
    const pathToPhoto = this.onUploadImage(this.image)
    
    let newCat : Cat = 
      new Cat(
        '500',
        this.name,
        this.birthDate,
        this.age,
        this.breed,
        true,
        this.gender,
        //this.image,
        '',
        [],
        this.description)
    this.addCattoFirebase(newCat) 
  }

}
