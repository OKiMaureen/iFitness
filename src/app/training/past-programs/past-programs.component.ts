import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Program } from '../program.model';
import { Store } from '@ngrx/store';
import { ProgramService } from '../program.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-programs',
  templateUrl: './past-programs.component.html',
  styleUrls: ['./past-programs.component.css']
})
export class PastProgramsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Program>();

  @ViewChild(MatSort) sort:  MatSort;
  @ViewChild(MatPaginator) paginator:  MatPaginator;


  constructor(private programService: ProgramService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
  this.store.select(fromTraining.getFinishedPrograms).subscribe(
    (programs: Program[]) =>{
    this.dataSource.data = programs;
    }
  );
  //  this.finishedProgramSubscription=this.programService.finishedProgramsChanged
  //  .subscribe((programs: Program[])=>{
  //    this.dataSource.data = programs;
  //   })

   this.programService.fetchCompletedOrCancelledProgram();
  }
  
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator= this.paginator;
  }

  filter(filterString: string){
    this.dataSource.filter = filterString.trim().toLowerCase();
  }


}
