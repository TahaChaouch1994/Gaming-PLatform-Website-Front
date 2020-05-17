import { TestBed } from '@angular/core/testing';

import { ChatmessageService } from './chatmessage.service';

describe('ChatmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatmessageService = TestBed.get(ChatmessageService);
    expect(service).toBeTruthy();
  });
});
