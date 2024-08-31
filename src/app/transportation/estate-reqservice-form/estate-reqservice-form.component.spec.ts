import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateReqserviceFormComponent } from './estate-reqservice-form.component';

describe('EstateReqserviceFormComponent', () => {
	let component: EstateReqserviceFormComponent;
	let fixture: ComponentFixture<EstateReqserviceFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EstateReqserviceFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EstateReqserviceFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
