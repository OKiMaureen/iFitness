import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { AuthGuard } from '../auth/auth.gaurd';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
    { path: '',
     component: TrainingComponent,
     canActivate: [AuthGuard]

 }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule],
})
export class TrainingRoutingModule {}
