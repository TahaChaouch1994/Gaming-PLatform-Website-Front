import { TestBed } from '@angular/core/testing';

import { SocketIOAdapterService } from './socket-ioadapter.service';

describe('SocketIOAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketIOAdapterService = TestBed.get(SocketIOAdapterService);
    expect(service).toBeTruthy();
  });
});
