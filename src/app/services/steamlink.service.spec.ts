import { TestBed } from '@angular/core/testing';

import { SteamlinkService } from './steamlink.service';

describe('SteamlinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SteamlinkService = TestBed.get(SteamlinkService);
    expect(service).toBeTruthy();
  });
});
