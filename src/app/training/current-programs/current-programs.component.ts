import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopProgramComponent } from '../stop-program/stop-program.component'

@Component({
  selector: 'app-current-programs',
  templateUrl: './current-programs.component.html',
  styleUrls: ['./current-programs.component.css']
})
export class CurrentProgramsComponent implements OnInit {
  progress = 0;
  timer: number;
  @Output() exitProgram= new EventEmitter<void>();


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startTimer();
  }
  startTimer(){
    this.timer=setInterval(()=>{
      this.progress = this.progress + 1;
      if (this.progress >=100){
        clearInterval(this.timer);
      }
    }, 1000)

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
          this.exitProgram.emit()
        } else {
          this.startTimer();
        }
      }
    );
  }

}
