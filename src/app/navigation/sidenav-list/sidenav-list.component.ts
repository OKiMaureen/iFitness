import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from  '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.services';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  onClose(){
    this.closeSideNav.emit();
  }

  logout(){
    this.authService.logoutUser();
  }


}
