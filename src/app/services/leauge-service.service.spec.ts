import { TestBed } from '@angular/core/testing';

import { LeaugeServiceService } from './leauge-service.service';

describe('LeaugeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaugeServiceService = TestBed.get(LeaugeServiceService);
    expect(service).toBeTruthy();
  });
});
