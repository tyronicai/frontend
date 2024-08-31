import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-incremental-field',
	templateUrl: './incremental-field.component.html',
	styleUrls: ['./incremental-field.component.scss'],
})
export class IncrementalFieldComponent implements OnInit {
	counterValue: number = 0;

	@Input() myHeader: string;
	@Input() step: number;
	@Input() min: number;
	@Input() range: boolean;

	constructor() {}

	@Input()
	get counter() {
		return this.counterValue;
	}

	@Output() counterChange = new EventEmitter();

	set counter(val) {
		this.counterValue = val;
		this.counterChange.emit(this.counterValue);
	}

	changeValue(arg: number) {
		this.counter += arg * this.step;
		if (this.counter < this.min) this.counter = this.min;
	}
	ngOnInit() {
		if (undefined == this.step) {
			this.step = 1;
		}
		if (undefined == this.min) {
			this.min = 0;
		}
	}
}
