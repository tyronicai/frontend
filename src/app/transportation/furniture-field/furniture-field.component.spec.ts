import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureFieldComponent } from './furniture-field.component';

describe('FurnitureFieldComponent', () => {
	let component: FurnitureFieldComponent;
	let fixture: ComponentFixture<FurnitureFieldComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FurnitureFieldComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FurnitureFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
