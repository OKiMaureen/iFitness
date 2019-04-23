import { Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { AuthService } from '../auth.services';
import { UiService } from '../../shared/ui.service';

import * as fromRootReducer from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLoading$: Observable<boolean>;
  

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<fromRootReducer.State>,
    ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRootReducer.getIsloading
      )
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => this.isLoading = isLoading
    // );
  }
  onSubmit(form: NgForm){
    this.authService.loginUser({
      email:form.value.email,
      password: form.value.password,
    })
  }

 

}
