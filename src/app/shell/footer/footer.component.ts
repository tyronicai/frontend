import { Component, OnInit, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	@Input() year: Number;

	constructor() {}

	ngOnInit() {
		this.setYear();
	}

	setYear() {
		this.year = new Date().getFullYear();
	}
}
