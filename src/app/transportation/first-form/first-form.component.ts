import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

//Services
import { TransportationService } from '@app/services/transportation/transportation.service';
import { CountryService } from '@app/services/country/country.service';

//models
import { Transportation } from '@app/models/TransportationModels/Transportation.model';
import { PostCodeData } from '@app/models/coreModels/PostCodeData.model';

// child comp
import { AddressFormComponent } from '../address-form/address-form.component';
import { AlertService } from 'ngx-alerts';
import { I18nService } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModel, ModalComponent } from '../../shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import {
	NgcCookieConsentService,
	NgcInitializeEvent,
	NgcStatusChangeEvent,
	NgcNoCookieLawEvent,
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-first-form',
	templateUrl: './first-form.component.html',
	styleUrls: ['./first-form.component.scss'],
})
export class FirstFormComponent implements OnInit, AfterViewInit, OnDestroy {
	// child ref
	@ViewChildren(AddressFormComponent) children: AddressFormComponent[];

	// transportation
	currentTransportation: Transportation;

	private popupOpenSubscription: Subscription;
	private popupCloseSubscription: Subscription;
	private initializeSubscription: Subscription;
	private statusChangeSubscription: Subscription;
	private revokeChoiceSubscription: Subscription;
	private noCookieLawSubscription: Subscription;

	constructor(
		private router: Router,
		private transportationService: TransportationService,
		private countryService: CountryService,
		private alertService: AlertService,
		private translate: TranslateService,
		public confirmDialog: MatDialog,
		private ccService: NgcCookieConsentService
	) {}

	ngOnInit() {
		this.translate //
			.get([
				'cookie.header',
				'cookie.message',
				'cookie.dismiss',
				'cookie.allow',
				'cookie.deny',
				'cookie.link',
				'cookie.policy',
			])
			.subscribe((data) => {
				this.ccService.getConfig().content = this.ccService.getConfig().content || {};
				// Override default messages with the translated ones
				this.ccService.getConfig().content.header = data['cookie.header'];
				this.ccService.getConfig().content.message = data['cookie.message'];
				this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
				this.ccService.getConfig().content.allow = data['cookie.allow'];
				this.ccService.getConfig().content.deny = data['cookie.deny'];
				this.ccService.getConfig().content.link = data['cookie.link'];
				this.ccService.getConfig().content.policy = data['cookie.policy'];

				this.ccService.destroy(); //remove previous cookie bar (with default messages)
				this.ccService.init(this.ccService.getConfig()); // update config with translated messages
			});
		this.setCookieSubscriptions();
		this.currentTransportation = this.transportationService.getCurrentTransportation();
	}

	ngAfterViewInit() {}

	setCookieSubscriptions() {
		this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
			// you can use this.ccService.getConfig() to do stuff...
		});

		this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
			// you can use this.ccService.getConfig() to do stuff...
		});

		this.initializeSubscription = this.ccService.initialize$.subscribe((event: NgcInitializeEvent) => {
			// you can use this.ccService.getConfig() to do stuff...
		});

		this.statusChangeSubscription = this.ccService.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
			// you can use this.ccService.getConfig() to do stuff...
		});

		this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(() => {
			// you can use this.ccService.getConfig() to do stuff...
		});

		this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe((event: NgcNoCookieLawEvent) => {
			// you can use this.ccService.getConfig() to do stuff...
		});
	}

	ngOnDestroy() {
		this.destroyCookieSubscriptions();
	}

	destroyCookieSubscriptions() {
		// unsubscribe to cookieconsent observables to prevent memory leaks
		this.popupOpenSubscription.unsubscribe();
		this.popupCloseSubscription.unsubscribe();
		this.initializeSubscription.unsubscribe();
		this.statusChangeSubscription.unsubscribe();
		this.revokeChoiceSubscription.unsubscribe();
		this.noCookieLawSubscription.unsubscribe();
	}
	isSupportedPostCodes(): boolean {
		let isSupported: boolean = false;
		isSupported =
			null !=
			this.countryService
				.getSupportedPostCodeDataList()
				.find(
					(x) =>
						x.postCode == this.currentTransportation.FromAddress.PostCode ||
						x.postCode == this.currentTransportation.ToAddress.PostCode
				);
		return isSupported;
	}
	MapTransportationForm() {
		this.router.navigateByUrl('/transportation/transportation-map');
	}
	EstateDetailForm() {
		let validationFlag = true;
		for (const myChild of this.children) {
			validationFlag = myChild.checkValidation() && validationFlag;
		}
		//
		if (validationFlag) {
			if (this.isSupportedPostCodes() == true) {
				this.router.navigateByUrl('/transportation/estate-detail');
			} else {
				this.translate
					.get(['First.Dialog.title', 'First.Dialog.message', 'First.Dialog.confirm', 'First.Dialog.dismiss'])
					.subscribe((data) => {
						const dialogData = new ConfirmDialogModel(
							data['First.Dialog.title'],
							data['First.Dialog.message'],
							data['First.Dialog.confirm'],
							data['First.Dialog.dismiss']
						);

						const dialogRef = this.confirmDialog.open(ModalComponent, {
							data: dialogData,
						});

						dialogRef.afterClosed().subscribe((dialogResult) => {
							let result: boolean = dialogResult;
							if (result) {
								this.router.navigateByUrl('/transportation/estate-detail');
							}
						});
					});
			}
		} else {
			// console.log('else work');
		}
	}
}
