import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/model/Cat';
import { CatService } from 'src/services/CatService/Cat.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss']
})
export class AdoptComponent implements OnInit {

  constructor(private catService : CatService) {
    this.catService = catService;
  }

  public unadoptedCats : Cat[] = this.catService.getCats();

  ngOnInit() {
  }

}
