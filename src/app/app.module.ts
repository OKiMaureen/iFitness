// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "angularfire2/auth";

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentProgramsComponent } from './training/current-programs/current-programs.component';
import { NewProgramsComponent } from './training/new-programs/new-programs.component';
import { PastProgramsComponent } from './training/past-programs/past-programs.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopProgramComponent } from './training/stop-program/stop-program.component';

import { AuthService } from './auth/auth.services';
import { ProgramService } from './training/program.service';
import { UiService } from './shared/ui.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentProgramsComponent,
    NewProgramsComponent,
    PastProgramsComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopProgramComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, ProgramService, UiService],
  bootstrap: [AppComponent],
  entryComponents: [StopProgramComponent],
})
export class AppModule { }
