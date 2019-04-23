import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>
 
  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }
 

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  
  onToggleSideNav(){
    this.sideNavToggle.emit();
  }

  logout(){
    this.authService.logoutUser();
  }

}
