import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articleDetail',
  templateUrl: './articleDetail.component.html',
  styleUrls: ['./articleDetail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  public id: number = 0; 

  constructor() { }

  ngOnInit() {
  }

}
