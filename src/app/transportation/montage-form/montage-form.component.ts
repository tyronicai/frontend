import { Component, OnInit, Input } from '@angular/core';
import { Estate } from '@app/models/EstateModels/estate.model';

@Component({
	selector: 'app-montage-form',
	templateUrl: './montage-form.component.html',
	styleUrls: ['./montage-form.component.scss'],
})
export class MontageFormComponent implements OnInit {
	@Input() fromEstateFlag: boolean;
	@Input() currentEstate: Estate;

	constructor() {}

	ngOnInit() {}
}
