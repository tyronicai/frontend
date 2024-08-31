import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationMapComponent } from './transportation-map.component';

describe('TransportationMapComponent', () => {
	let component: TransportationMapComponent;
	let fixture: ComponentFixture<TransportationMapComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TransportationMapComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TransportationMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
