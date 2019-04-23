import { Component, OnInit} from '@angular/core';
import { Subscription, Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  currentProgram$: Observable<boolean>;

  constructor(
    private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.currentProgram$ = this.store.select(fromTraining.getIsTraining)

  }

}
