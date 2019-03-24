import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { ProgramService } from '.././training/program.service';
import { UiService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    private isAuthenticated: boolean;
    authChange = new Subject<boolean>();

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private programService: ProgramService,
        private uiService: UiService,
        ){}
    
    authListener(){
        this.afAuth.authState.subscribe(user=>{
            if(user){
                this.isAuthenticated = true
                this.authChange.next(true);
                this.router.navigate(['/training']);  
            } else {
                this.programService.closeSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated=false;
            }
        })
    }
    registerUser(authData: AuthData){
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
             authData.password)
            .then(result =>{
                this.uiService.loadingStateChanged.next(false);
             })
             .catch(error=>{
               this.uiService.loadingStateChanged.next(false);
               this.uiService.showSnackBar(error.message, null, 3000)
             });
    }
    loginUser(authData: AuthData){
        this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
            .then(result =>{
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(error=>{
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error.message, null, 3000)
            });
    }
    logoutUser(){
        this.afAuth.auth.signOut();
        
    }

    isAuth(){
       return this.isAuthenticated;
    }
    
}

