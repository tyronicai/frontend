import { TestBed } from '@angular/core/testing';

import { TransportationService } from './transportation.service';

describe('Transportation.ServiceService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: TransportationService = TestBed.get(TransportationService);
		expect(service).toBeTruthy();
	});
});
