import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UstanoveFormService } from './ustanove-form.service';
import { UstanoveService } from '../service/ustanove.service';
import { IUstanove } from '../ustanove.model';

import { UstanoveUpdateComponent } from './ustanove-update.component';

describe('Ustanove Management Update Component', () => {
  let comp: UstanoveUpdateComponent;
  let fixture: ComponentFixture<UstanoveUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ustanoveFormService: UstanoveFormService;
  let ustanoveService: UstanoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UstanoveUpdateComponent],
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
      .overrideTemplate(UstanoveUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UstanoveUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ustanoveFormService = TestBed.inject(UstanoveFormService);
    ustanoveService = TestBed.inject(UstanoveService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ustanove: IUstanove = { id: 456 };

      activatedRoute.data = of({ ustanove });
      comp.ngOnInit();

      expect(comp.ustanove).toEqual(ustanove);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUstanove>>();
      const ustanove = { id: 123 };
      jest.spyOn(ustanoveFormService, 'getUstanove').mockReturnValue(ustanove);
      jest.spyOn(ustanoveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ustanove });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ustanove }));
      saveSubject.complete();

      // THEN
      expect(ustanoveFormService.getUstanove).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ustanoveService.update).toHaveBeenCalledWith(expect.objectContaining(ustanove));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUstanove>>();
      const ustanove = { id: 123 };
      jest.spyOn(ustanoveFormService, 'getUstanove').mockReturnValue({ id: null });
      jest.spyOn(ustanoveService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ustanove: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ustanove }));
      saveSubject.complete();

      // THEN
      expect(ustanoveFormService.getUstanove).toHaveBeenCalled();
      expect(ustanoveService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUstanove>>();
      const ustanove = { id: 123 };
      jest.spyOn(ustanoveService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ustanove });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ustanoveService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
