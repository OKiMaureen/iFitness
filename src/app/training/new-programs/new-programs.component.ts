import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-programs',
  templateUrl: './new-programs.component.html',
  styleUrls: ['./new-programs.component.css']
})
export class NewProgramsComponent implements OnInit {
  @Output() startProgram = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
  onStart(){
    this.startProgram.emit();
  }

}
