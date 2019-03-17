import {NgModule} from '@angular/core';
import {
    MatButtonModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
   } from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatDatepickerModule, 
      MatNativeDateModule, 
      MatCardModule, 
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule
    ],
  exports: [
      MatButtonModule, 
      MatCheckboxModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatDatepickerModule, 
      MatNativeDateModule, 
      MatCardModule, 
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule
    ],
})
export class MaterialModule { }
