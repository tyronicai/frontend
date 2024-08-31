import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { TransportationRouteResolver } from '@app/transportation/route-resolver/transportationRoute.resolve';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AuthenticationGuard } from './core';

const routes: Routes = [
	Shell.childRoutes([
		{
			path: 'transportation',
			loadChildren: './transportation/transportation.module#TransportationModule',
		},
	]),
	Shell.childRoutes([
		{
			path: 'login',
			loadChildren: './login/login.module#LoginModule',
		},
	]),
	Shell.childRoutes([
		{
			path: 'profile',
			loadChildren: './profile/profile.module#ProfileModule',
			canActivate: [AuthenticationGuard],
		},
	]),
	// Fallback when no prior route is matched
	{ path: '404', component: NotfoundComponent },
	{ path: '**', redirectTo: '/404' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
	providers: [],
})
export class AppRoutingModule {}
