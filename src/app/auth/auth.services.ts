import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { ProgramService } from '.././training/program.service';
import { UiService } from '../shared/ui.service';
import * as fromRootReducer from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.action';


@Injectable()
export class AuthService {
    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private programService: ProgramService,
        private uiService: UiService,
        private store: Store<{ui: fromRootReducer.State}>,
        ){}
    
    authListener(){
        this.afAuth.authState.subscribe(user=>{
            if(user){
                this.store.dispatch(new Auth.SetAuthenticated())
                this.router.navigate(['/training']);  
            } else {
                this.programService.closeSubscriptions();
                this.store.dispatch(new Auth.SetUnauthenticated())
                this.router.navigate(['/login']);
               
            }
        })
    }
    registerUser(authData: AuthData){
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
             authData.password)
            .then(result =>{
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading())
             })
             .catch(error=>{
            //    this.uiService.loadingStateChanged.next(false);
               this.store.dispatch({type: 'STOP_LOADING'})
               this.uiService.showSnackBar(error.message, null, 3000)
             });
    }
    loginUser(authData: AuthData){
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading())
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result =>{
                // this.uiService.loadingStateChanged.next(false);
                this.store.dispatch(new UI.StopLoading())
            })
            .catch(error=>{
                // this.uiService.loadingStateChanged.next(false);
                  this.store.dispatch(new UI.StopLoading())
                this.uiService.showSnackBar(error.message, null, 3000)
            });
    }
    logoutUser(){
        this.afAuth.auth.signOut();
        
    }
    
}

