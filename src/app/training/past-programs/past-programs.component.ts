import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Program } from '../program.model';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-past-programs',
  templateUrl: './past-programs.component.html',
  styleUrls: ['./past-programs.component.css']
})
export class PastProgramsComponent implements OnInit, AfterViewInit,  OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Program>();
  finishedProgramSubscription: Subscription;

  @ViewChild(MatSort) sort:  MatSort;
  @ViewChild(MatPaginator) paginator:  MatPaginator;


  constructor(private programService: ProgramService) { }

  ngOnInit() {
   this.finishedProgramSubscription=this.programService.finishedProgramsChanged
   .subscribe((programs: Program[])=>{
     this.dataSource.data = programs;
    })

   this.programService.fetchCompletedOrCancelledProgram();
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
  }

  filter(filterString: string){
    this.dataSource.filter = filterString.trim().toLowerCase();
  }

  ngOnDestroy(){
    if( this.finishedProgramSubscription ){
      this.finishedProgramSubscription.unsubscribe()
    }
  }

}
