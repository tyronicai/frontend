import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { PhoneFieldComponent } from './phone-field/phone-field.component';
import { IncrementalFieldComponent } from './incremental-field/incremental-field.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ModalComponent, ConfirmDialogModel } from './modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [FlexLayoutModule, MaterialModule, CommonModule, TranslateModule],
	declarations: [LoaderComponent, PhoneFieldComponent, IncrementalFieldComponent, NotfoundComponent, ModalComponent],
	exports: [LoaderComponent, PhoneFieldComponent, IncrementalFieldComponent],
})
export class SharedModule {}
