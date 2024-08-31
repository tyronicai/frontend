import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontageFormComponent } from './montage-form.component';

describe('MontageFormComponent', () => {
	let component: MontageFormComponent;
	let fixture: ComponentFixture<MontageFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MontageFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MontageFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
