import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceReportComponent } from './customer-service-report.component';

describe('CustomerServiceReportComponent', () => {
  let component: CustomerServiceReportComponent;
  let fixture: ComponentFixture<CustomerServiceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerServiceReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerServiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
