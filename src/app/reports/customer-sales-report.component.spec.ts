import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSalesReportComponent } from './customer-sales-report.component';

describe('CustomerSalesReportComponent', () => {
  let component: CustomerSalesReportComponent;
  let fixture: ComponentFixture<CustomerSalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSalesReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
