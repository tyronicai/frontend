import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteReusableStrategy } from './route-reusable-strategy';
import { HttpService } from './http/http.service';

import { EstateService } from '@app/services/estate/estate.service';

@NgModule({
	imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule],
	providers: [
		EstateService,
		{ provide: HttpClient, useClass: HttpService },
		{ provide: RouteReuseStrategy, useClass: RouteReusableStrategy },
	],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		// Import guard
		if (parentModule) {
			throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
		}
	}
}
