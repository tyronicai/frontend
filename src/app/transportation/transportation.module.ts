import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';

// my components
import { TransportationComponent } from './transportation.component';
import { FirstFormComponent } from './first-form/first-form.component';

// routing
import { TransportationRoutingModule } from './transportation-routing.module';

//services
import { EstateService } from '@app/services/estate/estate.service';
import { EstateFormComponent } from './estate-form/estate-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { TransportationService } from '@app/services/transportation/transportation.service';
import { SharedModule } from '@app/shared';
import { TfSubmitDialogComponent } from './tf-submit-dialog/tf-submit-dialog.component';
import { FurnitureFieldComponent } from './furniture-field/furniture-field.component';
import { MontageFormComponent } from './montage-form/montage-form.component';
import { ElevatorFormComponent } from './elevator-form/elevator-form.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { EstateDetailFormComponent } from './estate-detail-form/estate-detail-form.component';
import { DateFormComponent } from './date-form/date-form.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { FrngrpFormComponent } from './frngrp-form/frngrp-form.component';
import { EstateOuterpartFormComponent } from './estate-outerpart-form/estate-outerpart-form.component';
import { EstateReqserviceFormComponent } from './estate-reqservice-form/estate-reqservice-form.component';
import { AlertModule } from 'ngx-alerts';
import { ModalComponent, ConfirmDialogModel } from '@app/shared/modal/modal.component';
import { CostinfoFormComponent } from './costinfo-form/costinfo-form.component';
import { PackageFormComponent } from './package-form/package-form.component';
import { NgcCookieConsentModule, NgcCookieConsentConfig, NgcCookieConsentService } from 'ngx-cookieconsent';
import { TransportationMapComponent } from './transportation-map/transportation-map.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
	declarations: [
		TransportationComponent,
		FirstFormComponent,
		FurnitureFieldComponent,
		TfSubmitDialogComponent,
		EstateFormComponent,
		AddressFormComponent,
		MontageFormComponent,
		ElevatorFormComponent,
		DetailFormComponent,
		EstateDetailFormComponent,
		DateFormComponent,
		LoginOrRegisterComponent,
		FrngrpFormComponent,
		EstateOuterpartFormComponent,
		EstateReqserviceFormComponent,
		CostinfoFormComponent,
		PackageFormComponent,
		TransportationMapComponent,
		LandingComponent,
	],
	imports: [
		CommonModule,
		TranslateModule,
		FlexLayoutModule,
		MaterialModule,
		MatListModule,
		FormsModule,
		MatRadioModule,
		MatExpansionModule,
		MatGridListModule,
		MatButtonModule,
		ReactiveFormsModule,
		SharedModule,
		AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
		TransportationRoutingModule,
		//NgcCookieConsentModule
	],
	entryComponents: [TfSubmitDialogComponent, LoginOrRegisterComponent, FrngrpFormComponent],
	exports: [TransportationComponent],
	providers: [],
})
export class TransportationModule {}
