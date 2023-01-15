import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UstanoveDetailComponent } from './ustanove-detail.component';

describe('Ustanove Management Detail Component', () => {
  let comp: UstanoveDetailComponent;
  let fixture: ComponentFixture<UstanoveDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UstanoveDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ustanove: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UstanoveDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UstanoveDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ustanove on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ustanove).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
