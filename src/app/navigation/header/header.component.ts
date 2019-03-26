import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {AuthService} from '../../auth/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth= false;
 
  constructor(private authService: AuthService) { }
 

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus=>{
      this.isAuth = authStatus;
    })
  }
  
  ngOnDestroy() {
    this.authSubscription.unsubscribe()
  }
  onToggleSideNav(){
    this.sideNavToggle.emit();
  }

  logout(){
    this.authService.logoutUser();
  }

}
