import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateDetailFormComponent } from './estate-detail-form.component';

describe('EstateDetailFormComponent', () => {
	let component: EstateDetailFormComponent;
	let fixture: ComponentFixture<EstateDetailFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EstateDetailFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EstateDetailFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
