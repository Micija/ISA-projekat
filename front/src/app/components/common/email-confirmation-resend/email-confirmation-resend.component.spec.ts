import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationResendComponent } from './email-confirmation-resend.component';

describe('EmailConfirmationResendComponent', () => {
  let component: EmailConfirmationResendComponent;
  let fixture: ComponentFixture<EmailConfirmationResendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfirmationResendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfirmationResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
