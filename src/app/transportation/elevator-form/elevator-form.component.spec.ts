import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorFormComponent } from './elevator-form.component';

describe('ElevatorFormComponent', () => {
	let component: ElevatorFormComponent;
	let fixture: ComponentFixture<ElevatorFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ElevatorFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ElevatorFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
