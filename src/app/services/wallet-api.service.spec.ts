import { TestBed } from '@angular/core/testing';

import { WalletApiService } from './wallet-api.service';

describe('WalletApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WalletApiService = TestBed.get(WalletApiService);
    expect(service).toBeTruthy();
  });
});
