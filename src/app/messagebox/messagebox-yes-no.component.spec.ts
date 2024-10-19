import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageboxYesNoComponent } from './messagebox-yes-no.component';

describe('MessageboxYesNoComponent', () => {
  let component: MessageboxYesNoComponent;
  let fixture: ComponentFixture<MessageboxYesNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageboxYesNoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageboxYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
