import { TestBed } from '@angular/core/testing';

import { StreamkeyApiService } from './streamkey-api.service';

describe('StreamkeyApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StreamkeyApiService = TestBed.get(StreamkeyApiService);
    expect(service).toBeTruthy();
  });
});
