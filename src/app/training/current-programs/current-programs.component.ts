import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StopProgramComponent } from '../stop-program/stop-program.component'
import { ProgramService } from '../program.service';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-programs',
  templateUrl: './current-programs.component.html',
  styleUrls: ['./current-programs.component.css']
})
export class CurrentProgramsComponent implements OnInit {
  progress = 0;
  timer: number;

  @Output() exitProgram= new EventEmitter<void>();


  constructor(private dialog: MatDialog,
    private store: Store<fromTraining.State>,
    private programService: ProgramService) { }

  ngOnInit() {
    this.startTimer();
  }
  startTimer(){
    this.store.select(fromTraining.getActiveProgram).pipe(take(1)).subscribe(program => {
      const step = program.duration / 100 * 1000
      this.timer=setInterval(()=>{
      this.progress = this.progress + 1;
      if (this.progress >=100){
        this.programService.completeProgram();
        clearInterval(this.timer);
      }
    }, step)
    })
    

  }
  onClick(){
    clearInterval(this.timer);
    const dialogRef=this.dialog.open(StopProgramComponent, {
      data:{
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(
      result =>{ 
        if(result){
          this.programService.cancelProgram(this.progress)
        } else {
          this.startTimer();
        }
      }
    );
  }

}
