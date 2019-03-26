import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProgramService } from '../program.service';
import { UiService } from '../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { Program } from '../program.model';


@Component({
  selector: 'app-new-programs',
  templateUrl: './new-programs.component.html',
  styleUrls: ['./new-programs.component.css']
})
export class NewProgramsComponent implements OnInit,  OnDestroy {
  programSubscription: Subscription;
  programs: Program[];
  isLoading: boolean =false;
  loadingSubscription = new Subscription;

  constructor(
    private programService: ProgramService,
    private uiService: UiService,) {}
 
  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
    this.programSubscription = this.programService.programsChanged.subscribe(programs =>
      this.programs =programs)
    this.fetchPrograms();
  
  
  }
  onStart(form: NgForm){
    this.programService.startProgram(form.value.program); 
  }
  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
    this.programSubscription.unsubscribe();

  }

  fetchPrograms(){
    this.programService.fetchAvailablePrograms();
  }


}
