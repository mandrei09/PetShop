import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
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

  public columnHeader = this.tableHeaderService.getCatOwnersHeader();
  @Input() tableData : any;
  @Input() tableTitle : string = ''

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
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

}
