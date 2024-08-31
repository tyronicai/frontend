import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		data: {},
	},
	{
		path: 'register',
		component: RegisterComponent,
		data: {},
	},
	{
		path: 'forgotPassword',
		component: ForgotPasswordComponent,
		data: {},
	},
	{
		path: 'resetPassword',
		component: ResetPasswordComponent,
		data: {},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class LoginRoutingModule {}
