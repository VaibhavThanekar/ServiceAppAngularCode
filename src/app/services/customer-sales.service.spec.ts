import { TestBed } from '@angular/core/testing';

import { CustomerSalesService } from './customer-sales.service';

describe('CustomerSalesService', () => {
  let service: CustomerSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
