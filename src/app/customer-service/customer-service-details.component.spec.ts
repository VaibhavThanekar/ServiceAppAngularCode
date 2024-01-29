import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceDetailsComponent } from './customer-service-details.component';

describe('CustomerServiceDetailsComponent', () => {
  let component: CustomerServiceDetailsComponent;
  let fixture: ComponentFixture<CustomerServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerServiceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
