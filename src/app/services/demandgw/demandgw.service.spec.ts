import { TestBed } from '@angular/core/testing';

import { DemandgwService } from './demandgw.service';

describe('DemandgwService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: DemandgwService = TestBed.get(DemandgwService);
		expect(service).toBeTruthy();
	});
});
