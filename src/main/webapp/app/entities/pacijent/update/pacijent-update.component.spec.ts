import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PacijentFormService } from './pacijent-form.service';
import { PacijentService } from '../service/pacijent.service';
import { IPacijent } from '../pacijent.model';

import { PacijentUpdateComponent } from './pacijent-update.component';

describe('Pacijent Management Update Component', () => {
  let comp: PacijentUpdateComponent;
  let fixture: ComponentFixture<PacijentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pacijentFormService: PacijentFormService;
  let pacijentService: PacijentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PacijentUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PacijentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PacijentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pacijentFormService = TestBed.inject(PacijentFormService);
    pacijentService = TestBed.inject(PacijentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const pacijent: IPacijent = { id: 456 };

      activatedRoute.data = of({ pacijent });
      comp.ngOnInit();

      expect(comp.pacijent).toEqual(pacijent);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPacijent>>();
      const pacijent = { id: 123 };
      jest.spyOn(pacijentFormService, 'getPacijent').mockReturnValue(pacijent);
      jest.spyOn(pacijentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pacijent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pacijent }));
      saveSubject.complete();

      // THEN
      expect(pacijentFormService.getPacijent).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pacijentService.update).toHaveBeenCalledWith(expect.objectContaining(pacijent));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPacijent>>();
      const pacijent = { id: 123 };
      jest.spyOn(pacijentFormService, 'getPacijent').mockReturnValue({ id: null });
      jest.spyOn(pacijentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pacijent: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pacijent }));
      saveSubject.complete();

      // THEN
      expect(pacijentFormService.getPacijent).toHaveBeenCalled();
      expect(pacijentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPacijent>>();
      const pacijent = { id: 123 };
      jest.spyOn(pacijentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pacijent });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pacijentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
