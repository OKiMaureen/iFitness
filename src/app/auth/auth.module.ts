import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { Sharedmodule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [SignupComponent, LoginComponent],
    imports: [
    Sharedmodule,
    AngularFireAuthModule,
    AuthRoutingModule,
    ]
})
export class AuthModule {}

