import { TestBed } from '@angular/core/testing';

import { UsermerchService } from './usermerch.service';

describe('UsermerchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermerchService = TestBed.get(UsermerchService);
    expect(service).toBeTruthy();
  });
});
