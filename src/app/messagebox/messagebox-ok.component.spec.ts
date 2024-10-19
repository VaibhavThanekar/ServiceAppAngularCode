import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageboxOkComponent } from './messagebox-ok.component';

describe('MessageboxOkComponent', () => {
  let component: MessageboxOkComponent;
  let fixture: ComponentFixture<MessageboxOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageboxOkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageboxOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
