import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrngrpFormComponent } from './frngrp-form.component';

describe('FrngrpFormComponent', () => {
	let component: FrngrpFormComponent;
	let fixture: ComponentFixture<FrngrpFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FrngrpFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FrngrpFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
