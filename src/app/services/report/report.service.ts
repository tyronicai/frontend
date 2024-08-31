import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../core/i18n.service';

const routes = {
	// int id, bool? isPdfRequest, string cultureName
	generatePDF: () => '/Report/DemandReport',
};

@Injectable({
	providedIn: 'root',
})
export class ReportService {
	constructor(private httpService: HttpClient, private i18: I18nService) {}

	generatePDF() {}
}
