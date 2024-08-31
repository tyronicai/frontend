import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent, ResendMailDialogComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { DemandsComponent } from './demands/demands.component';
import { ProfileRoutingModule } from './profile-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [ProfileComponent, SettingsComponent, DemandsComponent, ResendMailDialogComponent],
	imports: [
		CommonModule,
		TranslateModule,
		FlexLayoutModule,
		MaterialModule,
		ProfileRoutingModule,
		NgxSpinnerModule,
		MatStepperModule,
		FormsModule,
		MatButtonModule,
		MatListModule,
		MatGridListModule,
		ReactiveFormsModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	entryComponents: [ResendMailDialogComponent],
})
export class ProfileModule {}
