import { TestBed } from '@angular/core/testing';

import { SubscribeStockService } from './subscribe-stock.service';

describe('SubscribeStockService', () => {
  let service: SubscribeStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
