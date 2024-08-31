import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// services
import { EstateService } from '@app/services/estate/estate.service';

// my modules
import { TransportationModule } from '../transportation/transportation.module';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		CoreModule,
		SharedModule,
		FlexLayoutModule,
		MaterialModule,
		Angulartics2Module,
		HomeRoutingModule,
		TransportationModule,
	],
	declarations: [HomeComponent],
	providers: [EstateService],
})
export class HomeModule {}
