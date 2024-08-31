import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { I18nService } from '../../core/i18n.service';

import { map, catchError, tap } from 'rxjs/operators';

// models
import { CountryList } from '../../models/coreModels/countryList.model';
import { PostCodeData } from '../../models/coreModels/PostCodeData.model';
import { SupportedPostCode } from '../../models/coreModels/SupportedPostCode.model';
import { PostCodesByDataReqMdl } from '../../models/RequestModels/PostCodesByDataReqMdl.model';
import { environment } from '@env/environment';

const routes = {
	getActiveCountryList: () => '/Country/GetActiveCountryList',
	routeGetAllCountryList: () => '/Country/GetActiveCountryList',
	routeGetSupportedPostCodesByCountryList: () => '/Country/GetSupportedPostCodesByCountryList',
	GetSupportedPostCodes: () => '/Country/GetSupportedPostCodes',
	routeGetPostCodeDataListByCountryIdAndPostCode: () => '/Country/GetPCDListByCountryIdAndPostCode',
	routeGetPostCodeDataListByCountryIdAndPlaceName: () => '/Country/GetPCDListByCountryIdAndPlaceName',
};

@Injectable({
	providedIn: 'root',
})
export class CountryService {
	private countryList: CountryList[];
	public postCodeList: PostCodeData[];
	public supportedPostCodeDataList: PostCodeData[];
	public supportedPostCodeList: SupportedPostCode[];

	constructor(private httpService: HttpClient, private i18: I18nService) {}

	get getCountryList() {
		if (undefined == this.countryList) {
			this.countryList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getActiveCountryList(), {})
				.subscribe((a) => {
					this.countryList = a['ueCountryList'];
					this.supportedPostCodeDataList = a['ueSupportedPostCodeDataList'];
				});
		}
		return this.countryList;
	}

	public subscribeToSupportedPostCodesByCountryList(countryId: number) {
		this.httpService
			.post(environment.baseURL + this.i18.language + routes.routeGetSupportedPostCodesByCountryList(), {
				countryId: countryId.toFixed(),
			})
			.subscribe((a: PostCodeData[]) => {
				this.postCodeList = a;
			});
	}

	public subscribeToPostCodeDataListByCountryIdAndPostCode(countryId: number, postCodeStr: string) {
		let data: PostCodesByDataReqMdl = new PostCodesByDataReqMdl();
		data.countryId = countryId;
		data.postCodeStr = postCodeStr;

		this.httpService
			.post(
				environment.baseURL + this.i18.language + routes.routeGetPostCodeDataListByCountryIdAndPostCode(),
				data
			)
			.subscribe((a: PostCodeData[]) => {
				this.postCodeList = a;
			});
	}

	public postPostCodeDataListByCountryIdAndPostCode(countryId: number, postCodeStr: string) {
		let httpHeaders = new HttpHeaders({
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			Accept: '*/*',
		});
		let options = {
			headers: httpHeaders,
		};

		let data: PostCodesByDataReqMdl = new PostCodesByDataReqMdl();
		data.countryId = countryId;
		data.postCodeStr = postCodeStr;
		let datastring: string = JSON.stringify(data);
		return this.httpService.post(
			environment.baseURL + this.i18.language + routes.routeGetPostCodeDataListByCountryIdAndPostCode(),
			data,
			options
		);
	}

	public postPostCodeDataListByCountryIdAndPlaceName(countryId: number, placeNameStr: string) {
		let httpHeaders = new HttpHeaders({
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			Accept: '*/*',
		});
		let options = {
			headers: httpHeaders,
		};

		let data: PostCodesByDataReqMdl = new PostCodesByDataReqMdl();
		data.countryId = countryId;
		data.placeNameStr = placeNameStr;
		let datastring: string = JSON.stringify(data);
		return this.httpService.post(
			environment.baseURL + this.i18.language + routes.routeGetPostCodeDataListByCountryIdAndPlaceName(),
			data,
			options
		);
	}

	get getPostCodeList() {
		return this.postCodeList;
	}

	public getChangedPostCodeList(argPostCodeList: PostCodeData[], countryId: number, postCodeStr: string) {
		let data: PostCodesByDataReqMdl;
		data = new PostCodesByDataReqMdl();
		data.countryId = countryId;
		data.postCodeStr = postCodeStr;

		this.httpService
			.post(
				environment.baseURL + this.i18.language + routes.routeGetPostCodeDataListByCountryIdAndPostCode(),
				data
			)
			.subscribe((a: PostCodeData[]) => {
				argPostCodeList = a;
			});

		return argPostCodeList;
	}

	public getSupportedPostCodeDataList(): PostCodeData[] {
		/*
		if (undefined == this.supportedPostCodeDataList) {
			this.supportedPostCodeDataList = [];
			this.httpService.post(routes.GetSupportedPostCodes(), {}).subscribe((a: SupportedPostCode[]) => {
				this.supportedPostCodeList = a;
			});
		}
		*/
		return this.supportedPostCodeDataList;
	}
}
