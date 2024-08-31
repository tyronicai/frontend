import { Component, OnInit, Input } from '@angular/core';
import { Estate } from '@app/models/EstateModels/estate.model';

@Component({
	selector: 'app-elevator-form',
	templateUrl: './elevator-form.component.html',
	styleUrls: ['./elevator-form.component.scss'],
})
export class ElevatorFormComponent implements OnInit {
	@Input() currentEstate: Estate;
	constructor() {}

	ngOnInit() {}
}
