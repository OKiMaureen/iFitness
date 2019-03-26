import { Component, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';


import { AuthService } from '../auth.services';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean =false;
  loadingSubscription = new Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }
  onSubmit(form: NgForm){
    this.authService.loginUser({
      email:form.value.email,
      password: form.value.password,
    })
  }

  ngOnDestroy(){
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
   
  }

}
