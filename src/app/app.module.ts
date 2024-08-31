import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { environment } from '@env/environment';
import { CoreModule, EstateService } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// my modules
import { TransportationModule } from './transportation/transportation.module';
import { TransportationService } from '@app/services/transportation/transportation.service';
import { DemandService } from '@app/services/demand/demand.service';
import { DemandgwService } from '@app/services/demandgw/demandgw.service';

import { TokenInterceptor } from '@app/helpers/token.interceptor';
import { UserService } from '@app/services/user/user.service';

//
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgcCookieConsentModule, NgcCookieConsentConfig, NgcCookieConsentService } from 'ngx-cookieconsent';
import { AccountService } from './services/account/account.service';
import { StorageService } from './services/storage/storage.service';

export function demandProviderMetaData(provider: DemandService) {
	return () => provider.load();
}

export function estateProviderMetaData(provider: EstateService) {
	return () => provider.load();
}

const cookieConfig: NgcCookieConsentConfig = {
	cookie: {
		domain: 'localhost:4200', // it is recommended to set your domain, for cookies to work properly
	},
	palette: {
		popup: {
			background: '#000',
		},
		button: {
			background: '#f1d600',
		},
	},
	theme: 'edgeless',
	type: 'opt-out',
	layout: 'my-custom-layout',
	layouts: {
		'my-custom-layout': '{{messagelink}}{{compliance}}',
	},
	elements: {
		messagelink: `
		<span id="cookieconsent:desc" class="cc-message">{{message}} 
		  <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>, 
		  <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and our 
		  <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>
		</span>
		`,
	},
	content: {
		message: 'By using our site, you acknowledge that you have read and understand our ',

		cookiePolicyLink: 'Cookie Policy',
		cookiePolicyHref: './assets/impressum/impressum.html',

		privacyPolicyLink: 'Privacy Policy',
		privacyPolicyHref: './assets/impressum/impressum.html',

		tosLink: 'Terms of Service',
		tosHref: './assets/impressum/impressum.html',
	},
};

@NgModule({
	imports: [
		BrowserModule,
		ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
		FormsModule,
		HttpClientModule,
		TranslateModule.forRoot(),
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		NgxSpinnerModule,
		MaterialModule,
		CoreModule,
		SharedModule,
		ShellModule,
		HomeModule,
		LoginModule,
		Angulartics2Module.forRoot(),
		TransportationModule,
		NgcCookieConsentModule.forRoot(cookieConfig),
		AppRoutingModule, // must be imported as the last module as it contains the fallback route
	],
	declarations: [AppComponent],
	providers: [
		EstateService,
		TransportationService,
		DemandService,
		DemandgwService,
		NgcCookieConsentService,
		UserService,
		AccountService,
		StorageService,

		{ provide: APP_INITIALIZER, useFactory: estateProviderMetaData, deps: [EstateService], multi: true },
		{ provide: APP_INITIALIZER, useFactory: demandProviderMetaData, deps: [DemandService], multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
