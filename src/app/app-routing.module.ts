import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.gaurd';

const routes: Routes = [
  { path: '',
    component: HomeComponent
  },
  {path:'training',
  loadChildren: './training/training.module#TrainingModule',
  canLoad: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard],
})
export class AppRoutingModule { }
