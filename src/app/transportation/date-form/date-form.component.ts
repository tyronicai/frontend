import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// child comp
import { TfSubmitDialogComponent } from '../tf-submit-dialog/tf-submit-dialog.component';

// services
import { EstateService } from '@app/services/estate/estate.service';
import { TransportationService } from '@app/services/transportation/transportation.service';
import { CountryService } from '@app/services/country/country.service';
import { I18nService } from '../../core/i18n.service';
import { DemandService } from '@app/services/demand/demand.service';
import { DemandgwService } from '@app/services/demandgw/demandgw.service';

// models
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { OAKLanguage } from '@app/models/coreModels/oakLanguage.model';
import { Demand } from '@app/models/DemandModels/Demand.model';
import { LoginOrRegisterComponent } from '../login-or-register/login-or-register.component';
import { UserService } from '@app/services/user/user.service';
import { User } from '@app/models/AccountModels/Account.model';

@Component({
	selector: 'app-date-form',
	templateUrl: './date-form.component.html',
	styleUrls: ['./date-form.component.scss'],
})
export class DateFormComponent implements OnInit {
	currentTransportation: Transportation;
	currentDemand: Demand;
	minDate = new Date();
	maxDate = new Date(2020, 0, 1);
	countryList: any;
	selected = '1';
	user: User;

	constructor(
		private router: Router,
		private transportationService: TransportationService,
		private userService: UserService,
		public countryService: CountryService,
		private i18: I18nService,
		private estateService: EstateService,
		private demandService: DemandService,
		public dialog: MatDialog,
		private demandgwService: DemandgwService
	) {}

	ngOnInit() {
		this.currentTransportation = this.transportationService.getCurrentTransportation();
		this.currentDemand = this.demandService.getCurrentDemand();
		this.userService.currentUser.subscribe((user: User) => (this.user = user));
	}

	ngDoCheck() {
		if (undefined == this.countryList || this.countryList.length == 0) {
			this.getCountryList();
		}
	}

	getCountryList() {
		this.countryList = this.countryService.getCountryList;
	}

	getOwnerName(event: any) {
		this.currentDemand.DemandOwner.Name = event;
	}

	getOwnerEMail(event: any) {
		this.currentDemand.DemandOwner.EMail = event;
	}

	getOwnerPhoneNumber(event: any) {
		this.currentDemand.DemandOwner.PhoneNumber = event;
	}

	getOwnerInitialDate($event: any) {
		this.currentTransportation.InitialTransportationDate = $event;
		this.initialDateFormControl.setValue(this.currentTransportation.InitialTransportationDate);
		if (this.currentTransportation.InitialTransportationDate > this.currentTransportation.FinalTransportationDate) {
			this.getOwnerFinalDate($event);
		}
	}

	getOwnerFinalDate($event: any) {
		this.currentTransportation.FinalTransportationDate = $event;
		this.finalDateFormControl.setValue(this.currentTransportation.FinalTransportationDate);
	}

	thirdForm() {
		if (this.user) {
			if (this.checkValidation()) {
				this.router.navigateByUrl('/transportation/components');
			}
		} else {
			const dialogRef = this.dialog.open(LoginOrRegisterComponent, {
				data: { OkPressed: false, currentDemand: this.currentDemand },
			});
			dialogRef.afterClosed().subscribe((result) => {
				// console.log('LoginOrRegisterComponent submit dialog was closed result:' + result);
				if (result === true) {
					// console.log('closed');
				}
			});
		}
	}

	checkValidation() {
		this.initialDateFormControl.setValue(this.currentTransportation.InitialTransportationDate);
		this.finalDateFormControl.setValue(this.currentTransportation.FinalTransportationDate);
		if (this.initialDateFormControl.valid && this.finalDateFormControl.valid) {
			return true;
		} else {
			this.initialDateFormControl.markAsTouched();
			this.finalDateFormControl.markAsTouched();
		}
	}

	initialDateFormControl = new FormControl('', [Validators.required]);
	finalDateFormControl = new FormControl('', [Validators.required]);

	openDialog(): void {
		if (this.user) {
			if (this.checkValidation()) {
				const dialogRef = this.dialog.open(TfSubmitDialogComponent, {
					width: '300px',
					data: { OkPressed: false, currentDemand: this.currentDemand },
				});

				dialogRef.afterClosed().subscribe((result) => {
					// console.log('The third from submit dialog was closed result:' + result);
					if (result === true) {
						this.currentTransportation.IsFixedPrice = false;
						this.currentTransportation.ExtraInfoLanguageId = this.estateService.getCurrentLnguageId();
						this.demandgwService.createTransportationDemand(this.currentDemand, this.currentTransportation);
						this.router.navigateByUrl('/transportation');
					}
				});
			}
		} else {
			const dialogRef = this.dialog.open(LoginOrRegisterComponent, {
				width: '450px',
				height: '300px',
				data: { OkPressed: false, currentDemand: this.currentDemand },
			});
			dialogRef.afterClosed().subscribe((result) => {
				// console.log('LoginOrRegisterComponent submit dialog was closed result:' + result);
				if (result === true) {
					// console.log('closed');
				}
			});
		}
	}
}
