import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ProgramService } from './program.service';
import { UiService } from '../shared/ui.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  currentProgram = false;
  programSubcsription: Subscription;
  isLoading: boolean =false;
  loadingSubscription = new Subscription;

  constructor(
    private programService: ProgramService,
    private uiService: UiService,
    ) {
    this.programSubcsription = this.programService.programChanged.subscribe(program => {
      if(program){
        this.currentProgram= true;
      } else {
        this.currentProgram =false;
      }
    })
   }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }
  ngOnDestroy(){
    this.loadingSubscription.unsubscribe();
  }


}
