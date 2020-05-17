import { TestBed } from '@angular/core/testing';

import { FollowApiService } from './follow-api.service';

describe('FollowApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowApiService = TestBed.get(FollowApiService);
    expect(service).toBeTruthy();
  });
});
