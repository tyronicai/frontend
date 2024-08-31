import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { RegisterComponent } from './register/register.component';
import { AlertModule } from 'ngx-alerts';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		TranslateModule,
		SharedModule,
		FlexLayoutModule,
		MaterialModule,
		LoginRoutingModule,
		AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
	],
	declarations: [
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent /*, PasswordMatchDirective */,
	],
})
export class LoginModule {}
