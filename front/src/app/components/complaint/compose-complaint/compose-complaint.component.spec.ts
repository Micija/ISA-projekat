import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeComplaintComponent } from './compose-complaint.component';

describe('ComposeComplaintComponent', () => {
  let component: ComposeComplaintComponent;
  let fixture: ComponentFixture<ComposeComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposeComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposeComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
