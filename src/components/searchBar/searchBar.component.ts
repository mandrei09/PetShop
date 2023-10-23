import { Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-searchBar',
  templateUrl: './searchBar.component.html',
  styleUrls: ['./searchBar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() {
  }

  private _searchInput : string = '';
  @Output() searchInputChanged = new EventEmitter<string>()

  get searchInput(){
    return this._searchInput;
  }

  set searchInput(searchInput){
    this._searchInput = searchInput;
    this.searchInputChanged.emit(searchInput);
  }

  ngOnInit() {
  }

}
