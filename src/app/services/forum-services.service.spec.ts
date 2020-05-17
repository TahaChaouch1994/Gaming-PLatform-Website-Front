import { TestBed } from '@angular/core/testing';

import { ForumServicesService } from './forum-services.service';

describe('ForumServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForumServicesService = TestBed.get(ForumServicesService);
    expect(service).toBeTruthy();
  });
});
