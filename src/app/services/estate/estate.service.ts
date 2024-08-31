import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { I18nService } from '../../core/i18n.service';

// models
import { EstateType } from '../../models/EstateModels/estateType.model';
import { EstatePartType } from '../../models/EstateModels/estatePartType.model';
import { FurnitureType } from '../../models/EstateModels/furnitureType.model';
import { FurnitureGroupType } from '../../models/EstateModels/furnitureGroupType.model';
import { EPartTypeFrnGrpType } from '../../models/EstateModels/ePartTypeFrnGrpType.model';
import { EstateTypeEPartType } from '../../models/EstateModels/estateTypeEPartType.model';

import { CountryList } from '../../models/coreModels/countryList.model';
import { LanguageIdText } from '../..//models/coreModels/languageIdText.model';
import { OAKLanguage } from '../../models/coreModels/oakLanguage.model';
import { BooleanLiteral } from 'babel-types';
import { FlatType } from '../../models/EstateModels/flatType.model';
import { PostCodeData } from '../../models/coreModels/PostCodeData.model';
import { environment } from '@env/environment';

const routes = {
	getEstateTypes: () => '/Estate/GetAllEstateTypes',
	getFlatTypes: () => '/Estate/GetAllFlatTypes',
	getEstatePartTypes: () => '/Estate/GetAllEstatePartTypes',
	getFurnitureTypes: () => '/Estate/GetAllFurnitureTypes',
	getAllEstateTypeEPartTypes: () => '/Estate/GetAllEstateTypeEPartTypes',
	getAllEPartTypeFrnTypes: () => '/Estate/GetAllEPartTypeFrnTypes',
	getActiveLanguageList: () => '/Language/GetActiveLanguageList',
	getActiveCountryList: () => '/Country/GetActiveCountryList',
	getEstateMetaData: () => '/Estate/GetEstateMetaData',
};

@Injectable({
	providedIn: 'root',
})
export class EstateService {
	private estateTypeList: EstateType[];
	private flatTypeList: FlatType[];
	private estatePartTypeList: EstatePartType[];
	private furnitureTypeList: FurnitureType[];
	private furnitureGroupTypeList: FurnitureGroupType[];
	private estateTypeEPartTypeList: EstateTypeEPartType[];
	private ePartTypeFrnGrpTypeList: EPartTypeFrnGrpType[];
	private languageList: OAKLanguage[];
	//private countryList: CountryList[];
	//private supportedPostCodeDataList:PostCodeData[];
	private estatemetadataflag = false;

	constructor(private httpService: HttpClient, private i18: I18nService) {
		// console.log('EstateService instance created.');
	}

	load() {
		return new Promise((resolve, reject) => {
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getEstateMetaData(), {})
				.subscribe((a) => {
					this.estateTypeList = a['ueEstateTypeList'];
					this.flatTypeList = a['ueFlatTypeList'];
					this.estatePartTypeList = a['ueEstatePartTypeList'];
					this.furnitureTypeList = a['ueFurnitureTypeList'];
					this.furnitureGroupTypeList = a['ueFurnitureGroupTypeList'];
					this.estateTypeEPartTypeList = a['estateTypeEPartTypeList'];
					this.ePartTypeFrnGrpTypeList = a['ePartTypeFrnGrpTypeList'];
					// console.table(this.estateTypeList);
					// console.table(this.estatePartTypeList);
					// console.table(this.furnitureTypeList);
					// console.table(this.estatePartTypeList);
					// console.table(this.ePartTypeFrnTypeList);
					this.estatemetadataflag = true;

					resolve(true);
				});
		});
	}

	public getEstateMetaData() {
		return this.httpService
			.post(environment.baseURL + this.i18.language + routes.getEstateMetaData(), {})
			.subscribe((a) => {
				this.estateTypeList = a['ueEstateTypeList'];
				this.flatTypeList = a['ueFlatTypeList'];
				this.estatePartTypeList = a['ueEstatePartTypeList'];
				this.furnitureTypeList = a['ueFurnitureTypeList'];
				this.furnitureGroupTypeList = a['ueFurnitureGroupTypeList'];
				this.estateTypeEPartTypeList = a['estateTypeEPartTypeList'];
				this.ePartTypeFrnGrpTypeList = a['ePartTypeFrnGrpTypeList'];
				// console.table(this.estateTypeList);
				// console.table(this.estatePartTypeList);
				// console.table(this.furnitureTypeList);
				// console.table(this.estatePartTypeList);
				// console.table(this.ePartTypeFrnTypeList);
				this.estatemetadataflag = true;
			});
	}

	public isEstateMetaDataFetched(): boolean {
		return this.estatemetadataflag;
	}

	get getEstateTypeList() {
		if (undefined == this.estateTypeList) {
			this.estateTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getEstateTypes(), {})
				.subscribe((a) => {
					this.estateTypeList = a['ueEstateTypeList'];
				});
		}
		return this.estateTypeList;
	}

	public getFlatTypeList(): FlatType[] {
		if (undefined == this.flatTypeList) {
			this.flatTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getFlatTypes(), {})
				.subscribe((a) => {
					this.flatTypeList = a['ueFlatTypeList'];
				});
		}
		return this.flatTypeList;
	}

	public getEstatePartTypeList(): EstatePartType[] {
		if (undefined == this.estatePartTypeList) {
			this.estatePartTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getEstatePartTypes(), {})
				.subscribe((a) => {
					this.estatePartTypeList = a['ueEstatePartTypeList'];
				});
		}
		return this.estatePartTypeList;
	}

	public getFurnitureTypeList(): FurnitureType[] {
		if (undefined == this.furnitureTypeList) {
			this.furnitureTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getFurnitureTypes(), {})
				.subscribe((a) => {
					this.furnitureTypeList = a['ueFurnitureTypeList'];
				});
		}
		return this.furnitureTypeList;
	}

	public getEstateTypeEPartTypeList(): EstateTypeEPartType[] {
		if (undefined == this.estateTypeEPartTypeList) {
			this.estateTypeEPartTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getAllEstateTypeEPartTypes(), {})
				.subscribe((a) => {
					this.estateTypeEPartTypeList = a['ueEstateTypeEPartTypeList'];
				});
		}
		return this.estateTypeEPartTypeList;
	}

	public getEPartTypeFrnGrpTypeList(): EPartTypeFrnGrpType[] {
		if (undefined == this.ePartTypeFrnGrpTypeList) {
			this.ePartTypeFrnGrpTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getAllEPartTypeFrnTypes(), {})
				.subscribe((a) => {
					this.ePartTypeFrnGrpTypeList = a['ueEPartTypeFrnGrpTypeList'];
				});
		}
		return this.ePartTypeFrnGrpTypeList;
	}

	get getLanguageList() {
		if (undefined == this.languageList) {
			this.languageList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getActiveLanguageList(), {})
				.subscribe((a) => {
					this.languageList = a['ueLanguageList'];
				});
		}
		return this.languageList;
	}
	/*
	get getCountryList() {
		if (undefined == this.countryList) {
			this.countryList = [];
			this.supportedPostCodeDataList = [];
			this.httpService.post(environment.baseURL + this.i18.language + routes.getActiveCountryList(), {}).subscribe((a) => {
				this.countryList = a['ueCountryList'];
				this.supportedPostCodeDataList=a['ueSupportedPostCodeDataList'];
			});
		}
		return this.countryList;
	}
*/
	/*
	get getSupportedPostCodeDataList()
	{
		return this.supportedPostCodeDataList;
	}
*/
	public getCurrentLnguageId(): number {
		let langId: number = this.getLanguageList.find((cb) => cb.cultureName == this.i18.language).id;
		return langId;
	}

	// functions
	public getNameByLanguage(argObj: any) {
		if (0 == this.getLanguageList.length || undefined == argObj || null == argObj) {
			return null;
		}

		let langId: number = this.getLanguageList.find((cb) => cb.cultureName == this.i18.language).id;

		let languageIdTexts: LanguageIdText[] = argObj.languageIdTexts;
		let text = languageIdTexts.find((cb) => cb.languageId == langId).text;
		return text;
	}

	public getLanguageNameByLanguage(argObj: any) {
		if (0 == this.getLanguageList.length || undefined == argObj || null == argObj) {
			return null;
		}
		let name = this.getLanguageList.find((cb) => cb.cultureName == argObj).name.split('(')[0];
		return name;
	}

	public getDescriptionByLanguage(argObj: any) {
		if (0 == this.getLanguageList.length || undefined == argObj || null == argObj) {
			return null;
		}

		let langId: number = this.getLanguageList.find((cb) => cb.cultureName == this.i18.language).id;

		let languageIdTexts: LanguageIdText[] = argObj.languageIdTexts;
		let description = languageIdTexts.find((cb) => cb.languageId == langId).description;
		return description;
	}

	public getEstateTypeNameById(argId: number) {
		var myEstate = this.getEstateTypeList.find((x) => x.id == argId);
		if (undefined == myEstate) return null;
		return this.getNameByLanguage(myEstate);
	}

	public getFlatTypeNameById(argId: number) {
		var myObject = this.flatTypeList.find((x) => x.id == argId);
		if (undefined == myObject) return null;
		return this.getNameByLanguage(myObject);
	}

	public getEstatePartTypeNameById(argId: number) {
		var myObject = this.estatePartTypeList.find((x) => x.id == argId);
		if (undefined == myObject) return null;
		return this.getNameByLanguage(myObject);
	}

	public getFurnitureTypeNameById(argId: number) {
		var myObject = this.furnitureTypeList.find((x) => x.id == argId);
		if (undefined == myObject) return null;
		return this.getNameByLanguage(myObject);
	}

	public getFrnGrpTypeListByEPartTypeId(argEPartTypeId: number): FurnitureGroupType[] {
		if (undefined == this.ePartTypeFrnGrpTypeList) {
			this.ePartTypeFrnGrpTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getAllEPartTypeFrnTypes(), {})
				.subscribe((a) => {
					this.ePartTypeFrnGrpTypeList = a['ueEPartTypeFrnGrpTypeList'];
				});
		}
		var mylist: EPartTypeFrnGrpType[] = this.ePartTypeFrnGrpTypeList.filter(
			(x) => x.estatePartTypeId == argEPartTypeId
		);
		let retList: FurnitureGroupType[] = [];
		for (let ent of mylist) {
			for (let furnitureGroupType of this.furnitureGroupTypeList) {
				if (furnitureGroupType.id == ent.furnitureGroupTypeId) retList.push(furnitureGroupType);
			}
		}
		return retList;
	}

	public getNotInFrnGrpTypeListByEPartTypeId(argEPartTypeId: number): FurnitureGroupType[] {
		if (undefined == this.ePartTypeFrnGrpTypeList) {
			this.ePartTypeFrnGrpTypeList = [];
			this.httpService
				.post(environment.baseURL + this.i18.language + routes.getAllEPartTypeFrnTypes(), {})
				.subscribe((a) => {
					this.ePartTypeFrnGrpTypeList = a['ueEPartTypeFrnGrpTypeList'];
				});
		}
		var mylist: EPartTypeFrnGrpType[] = this.ePartTypeFrnGrpTypeList.filter(
			(x) => x.estatePartTypeId == argEPartTypeId
		);
		let retList: FurnitureGroupType[] = [];

		for (let furnitureGroupType of this.furnitureGroupTypeList) {
			if (null == mylist.find((x) => x.furnitureGroupTypeId == furnitureGroupType.id)) {
				retList.push(furnitureGroupType);
			}
		}
		return retList;
	}
}
