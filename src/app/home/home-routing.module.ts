import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
	Shell.childRoutes([
		/*
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: extract('Home') } }
    */
		{ path: '', redirectTo: '/landing', pathMatch: 'full' },
		{ path: 'home', redirectTo: '/transportation', pathMatch: 'full' },
	]),
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class HomeRoutingModule {}
