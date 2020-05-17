import { TestBed } from '@angular/core/testing';

import { SubscribeApiService } from './subscribe-api.service';

describe('SubscribeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscribeApiService = TestBed.get(SubscribeApiService);
    expect(service).toBeTruthy();
  });
});
