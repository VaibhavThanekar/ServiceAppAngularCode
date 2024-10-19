import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdditionalReminderModalComponent } from './customer-additional-reminder-modal.component';

describe('CustomerAdditionalReminderModalComponent', () => {
  let component: CustomerAdditionalReminderModalComponent;
  let fixture: ComponentFixture<CustomerAdditionalReminderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAdditionalReminderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerAdditionalReminderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
