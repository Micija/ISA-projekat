import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PacijentDetailComponent } from './pacijent-detail.component';

describe('Pacijent Management Detail Component', () => {
  let comp: PacijentDetailComponent;
  let fixture: ComponentFixture<PacijentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacijentDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pacijent: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PacijentDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PacijentDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pacijent on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pacijent).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
