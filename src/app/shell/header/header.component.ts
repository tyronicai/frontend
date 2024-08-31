import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { I18nService } from '@app/core';
import { CountryService } from '@app/services/country/country.service';
import { EstateService } from '@app/services/estate/estate.service';
import { Account } from '@app/models/AccountModels/Account.model';
import { UserService } from '@app/services/user/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input() sidenav!: MatSidenav;
	countryList: any;
	account: Account;

	constructor(
		private router: Router,
		private titleService: Title,
		public i18nService: I18nService,
		public countryService: CountryService,
		public estateService: EstateService,
		public userService: UserService
	) {
		/*
		if (this.userService.isUserLoggedIn()) {
						this.account = userService.currentUserValue;
		}
		else {
					this.account = null;
				}
    */
		this.userService.currentUser.subscribe((user) => {
			if (user !== null) {
				this.account = user;
			} else {
				this.account = null;
			}
		});
	}

	ngOnInit() {}

	setLanguage(language: string) {
		this.i18nService.language = language;
	}

	logout() {
		this.userService.logout();
		this.router.navigate(['/transportation'], { replaceUrl: true });
	}

	loginPage() {
		this.router.navigate(['/login'], { replaceUrl: true });
	}

	registerPage() {
		this.router.navigate(['/login/register'], { replaceUrl: true });
	}

	profilePage() {
		this.router.navigateByUrl('profile');
	}

	get languages(): string[] {
		return this.i18nService.supportedLanguages;
	}

	get title(): string {
		return this.titleService.getTitle();
	}
}
