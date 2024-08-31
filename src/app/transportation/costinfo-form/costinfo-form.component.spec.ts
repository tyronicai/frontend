import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostinfoFormComponent } from './costinfo-form.component';

describe('CostinfoFormComponent', () => {
	let component: CostinfoFormComponent;
	let fixture: ComponentFixture<CostinfoFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CostinfoFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CostinfoFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
