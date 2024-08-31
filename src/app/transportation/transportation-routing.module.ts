import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';

import { TransportationComponent } from './transportation.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { EstateDetailFormComponent } from './estate-detail-form/estate-detail-form.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { DateFormComponent } from './date-form/date-form.component';
import { EstateOuterpartFormComponent } from './estate-outerpart-form/estate-outerpart-form.component';
import { EstateReqserviceFormComponent } from './estate-reqservice-form/estate-reqservice-form.component';
import { TransportationMapComponent } from './transportation-map/transportation-map.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
	// Module is lazy loaded, see app-routing.module.ts
	{
		path: '',
		component: TransportationComponent,
		data: {},
	},
	{
		path: 'date-form',
		component: DateFormComponent,
		data: {},
	},
	{
		path: 'estate-outerpart-form',
		component: EstateOuterpartFormComponent,
		data: {},
	},
	{
		path: 'estate-reqservice-form',
		component: EstateReqserviceFormComponent,
		data: {},
	},
	{
		path: 'estate-detail',
		component: EstateDetailFormComponent,
		data: {},
	},

	{
		path: 'components',
		component: DetailFormComponent,
		data: {},
	},

	{
		path: 'transportation-map',
		component: TransportationMapComponent,
		data: {},
	},
	{
		path: 'landing',
		component: LandingComponent,
		data: {},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class TransportationRoutingModule {}
