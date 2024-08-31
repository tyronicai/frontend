import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TfSubmitDialogComponent } from './tf-submit-dialog.component';

describe('TfSubmitDialogComponent', () => {
	let component: TfSubmitDialogComponent;
	let fixture: ComponentFixture<TfSubmitDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TfSubmitDialogComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TfSubmitDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
