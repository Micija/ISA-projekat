import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PregledDetailComponent } from './pregled-detail.component';

describe('Pregled Management Detail Component', () => {
  let comp: PregledDetailComponent;
  let fixture: ComponentFixture<PregledDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pregled: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PregledDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PregledDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pregled on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pregled).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
