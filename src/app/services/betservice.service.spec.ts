import { TestBed } from '@angular/core/testing';

import { BetserviceService } from './betservice.service';

describe('BetserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetserviceService = TestBed.get(BetserviceService);
    expect(service).toBeTruthy();
  });
});
