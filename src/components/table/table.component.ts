import { AfterViewInit, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeaderService } from 'src/services/TableHeaderService/TableHeader.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  constructor(public tableHeaderService : TableHeaderService) 
  {
    this.tableHeaderService = tableHeaderService
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource : any;
  public isLoadingResults = false;
  public resultsLength : any;
  public objectKeys = Object.keys;

  @Input() columnHeader : any; 
  @Input() tableData : any;
  @Input() tableTitle : string = ''
  @Input() selectionType : string = ''
  public isChecked : boolean[] = []
  public selectedItems : any[] = []
  @Output() selectedItemsChanged = new EventEmitter<any[]>();

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.tableData.forEach(() => {
      this.isChecked.push(false)
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCheckboxChange(itemIndex : number): void {
    if(this.selectionType==='single'){
      for(let i=0;i<this.isChecked.length;i++){
        if(i!=itemIndex){
          this.isChecked[i]=false;
        }
      }
      if(this.isChecked.every(value => !value))
        this.selectedItems = []
      else
        this.selectedItems[0] = this.tableData[itemIndex]
    }
    else 
      if(this.selectionType==='multiple')
      {
        this.selectedItems = []
        for(let i=0;i<this.isChecked.length;i++){
          if(this.isChecked[i]==true){
            this.selectedItems.push(this.tableData[i])
          }
        }
      }
    this.selectedItemsChanged.emit(this.selectedItems);
  }
}
