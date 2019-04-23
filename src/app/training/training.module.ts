import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material.module';
import { TrainingComponent } from './training.component';
import { CurrentProgramsComponent } from './current-programs/current-programs.component';
import { NewProgramsComponent } from './new-programs/new-programs.component';
import { PastProgramsComponent } from './past-programs/past-programs.component';
import { StopProgramComponent } from './stop-program/stop-program.component';
import { Sharedmodule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';




@NgModule({
    declarations: [
        TrainingComponent,
        CurrentProgramsComponent,
        NewProgramsComponent,
        PastProgramsComponent,
        StopProgramComponent,
       
    ],
    imports: [
        MaterialModule,
        Sharedmodule,
        FlexLayoutModule,
        FormsModule,
        CommonModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)

    
    ],
    entryComponents: [StopProgramComponent],

})
export class TrainingModule {}


