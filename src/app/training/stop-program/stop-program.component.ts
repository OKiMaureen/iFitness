import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-program',
  templateUrl: './stop-program.component.html',
  styleUrls: ['./stop-program.component.css']
})
export class StopProgramComponent implements OnInit {

  constructor(@Inject( MAT_DIALOG_DATA ) public passedData: any) {}

  ngOnInit() {
  }

}
