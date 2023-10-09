import { TestBed } from '@angular/core/testing';

import { UserSubscribedStocksService } from './user-subscribed-stocks.service';

describe('UserSubscribedStocksService', () => {
  let service: UserSubscribedStocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSubscribedStocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
