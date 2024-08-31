import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateOuterpartFormComponent } from './estate-outerpart-form.component';

describe('EstateOuterpartFormComponent', () => {
	let component: EstateOuterpartFormComponent;
	let fixture: ComponentFixture<EstateOuterpartFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EstateOuterpartFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EstateOuterpartFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
