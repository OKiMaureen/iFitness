import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramService } from '../program.service';
import { UiService } from '../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { Program } from '../program.model';
import { Store } from '@ngrx/store';
import * as fromRootReducer from '../../app.reducer';

import * as fromTraining from '../training.reducer';


@Component({
  selector: 'app-new-programs',
  templateUrl: './new-programs.component.html',
  styleUrls: ['./new-programs.component.css']
})
export class NewProgramsComponent implements OnInit {
  // programSubscription: Subscription;
  // programs: Program[];
  isLoading$: Observable<boolean>;
  programs$: Observable<Program[]>;
  // loadingSubscription = new Subscription;

  constructor(
    private programService: ProgramService, 
    // private uiService: UiService,
    private store: Store<fromTraining.State>) {}
 
  ngOnInit() {
    // this.store.select(fromTraining.getAvailablePrograms).subscribe(
    //   (programs: Program[]) =>{
    //     this.programs$ = programs;
    //     }
    // );
    this.isLoading$ = this.store.select(fromRootReducer.getIsloading);
    this.programs$ = this.store.select(fromTraining.getAvailablePrograms);
 

    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => this.isLoading = isLoading
    // );
    // this.programSubscription = this.programService.programsChanged.subscribe(programs =>
    //   this.programs =programs)
    this.programService.fetchAvailablePrograms();
  
  
  }
  onStart(form: NgForm){
    this.programService.startProgram(form.value.program); 
  }



}
