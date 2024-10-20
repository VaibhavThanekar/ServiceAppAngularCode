import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousReminderReportComponent } from './previous-reminder-report.component';

describe('PreviousReminderReportComponent', () => {
  let component: PreviousReminderReportComponent;
  let fixture: ComponentFixture<PreviousReminderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviousReminderReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousReminderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
