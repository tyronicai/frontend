import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { DemandsComponent } from './demands/demands.component';

const routes: Routes = [
	// Module is lazy loaded, see app-routing.module.ts
	{
		path: '',
		component: ProfileComponent,
		data: {},
	},
	{
		path: 'settings',
		component: SettingsComponent,
		data: {},
	},
	{
		path: 'demands',
		component: DemandsComponent,
		data: {},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class ProfileRoutingModule {}
