import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementalFieldComponent } from './incremental-field.component';

describe('IncrementalFieldComponent', () => {
	let component: IncrementalFieldComponent;
	let fixture: ComponentFixture<IncrementalFieldComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IncrementalFieldComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IncrementalFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
