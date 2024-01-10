import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loadingSpinner',
  templateUrl: './loadingSpinner.component.html',
  styleUrls: ['./loadingSpinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  public hideloader() { 
    document.getElementById('loading')!.style.display = 'none'; 
  } 

}
