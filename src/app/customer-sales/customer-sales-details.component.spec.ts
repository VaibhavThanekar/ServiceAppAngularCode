import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSalesDetailsComponent } from './customer-sales-details.component';

describe('CustomerSalesDetailsComponent', () => {
  let component: CustomerSalesDetailsComponent;
  let fixture: ComponentFixture<CustomerSalesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSalesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSalesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
