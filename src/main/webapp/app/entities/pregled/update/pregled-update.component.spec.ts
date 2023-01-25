import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PregledFormService } from './pregled-form.service';
import { PregledService } from '../service/pregled.service';
import { IPregled } from '../pregled.model';
import { IPacijent } from 'app/entities/pacijent/pacijent.model';
import { PacijentService } from 'app/entities/pacijent/service/pacijent.service';
import { IUstanove } from 'app/entities/ustanove/ustanove.model';
import { UstanoveService } from 'app/entities/ustanove/service/ustanove.service';

import { PregledUpdateComponent } from './pregled-update.component';

describe('Pregled Management Update Component', () => {
  let comp: PregledUpdateComponent;
  let fixture: ComponentFixture<PregledUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pregledFormService: PregledFormService;
  let pregledService: PregledService;
  let pacijentService: PacijentService;
  let ustanoveService: UstanoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PregledUpdateComponent],
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
      .overrideTemplate(PregledUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PregledUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pregledFormService = TestBed.inject(PregledFormService);
    pregledService = TestBed.inject(PregledService);
    pacijentService = TestBed.inject(PacijentService);
    ustanoveService = TestBed.inject(UstanoveService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pacijent query and add missing value', () => {
      const pregled: IPregled = { id: 456 };
      const pacijent: IPacijent = { id: 59683 };
      pregled.pacijent = pacijent;

      const pacijentCollection: IPacijent[] = [{ id: 46709 }];
      jest.spyOn(pacijentService, 'query').mockReturnValue(of(new HttpResponse({ body: pacijentCollection })));
      const additionalPacijents = [pacijent];
      const expectedCollection: IPacijent[] = [...additionalPacijents, ...pacijentCollection];
      jest.spyOn(pacijentService, 'addPacijentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      expect(pacijentService.query).toHaveBeenCalled();
      expect(pacijentService.addPacijentToCollectionIfMissing).toHaveBeenCalledWith(
        pacijentCollection,
        ...additionalPacijents.map(expect.objectContaining)
      );
      expect(comp.pacijentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Ustanove query and add missing value', () => {
      const pregled: IPregled = { id: 456 };
      const ustanove: IUstanove = { id: 93129 };
      pregled.ustanove = ustanove;

      const ustanoveCollection: IUstanove[] = [{ id: 72110 }];
      jest.spyOn(ustanoveService, 'query').mockReturnValue(of(new HttpResponse({ body: ustanoveCollection })));
      const additionalUstanoves = [ustanove];
      const expectedCollection: IUstanove[] = [...additionalUstanoves, ...ustanoveCollection];
      jest.spyOn(ustanoveService, 'addUstanoveToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      expect(ustanoveService.query).toHaveBeenCalled();
      expect(ustanoveService.addUstanoveToCollectionIfMissing).toHaveBeenCalledWith(
        ustanoveCollection,
        ...additionalUstanoves.map(expect.objectContaining)
      );
      expect(comp.ustanovesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pregled: IPregled = { id: 456 };
      const pacijent: IPacijent = { id: 89686 };
      pregled.pacijent = pacijent;
      const ustanove: IUstanove = { id: 52963 };
      pregled.ustanove = ustanove;

      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      expect(comp.pacijentsSharedCollection).toContain(pacijent);
      expect(comp.ustanovesSharedCollection).toContain(ustanove);
      expect(comp.pregled).toEqual(pregled);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPregled>>();
      const pregled = { id: 123 };
      jest.spyOn(pregledFormService, 'getPregled').mockReturnValue(pregled);
      jest.spyOn(pregledService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pregled }));
      saveSubject.complete();

      // THEN
      expect(pregledFormService.getPregled).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pregledService.update).toHaveBeenCalledWith(expect.objectContaining(pregled));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPregled>>();
      const pregled = { id: 123 };
      jest.spyOn(pregledFormService, 'getPregled').mockReturnValue({ id: null });
      jest.spyOn(pregledService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pregled: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pregled }));
      saveSubject.complete();

      // THEN
      expect(pregledFormService.getPregled).toHaveBeenCalled();
      expect(pregledService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPregled>>();
      const pregled = { id: 123 };
      jest.spyOn(pregledService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pregledService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePacijent', () => {
      it('Should forward to pacijentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pacijentService, 'comparePacijent');
        comp.comparePacijent(entity, entity2);
        expect(pacijentService.comparePacijent).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUstanove', () => {
      it('Should forward to ustanoveService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ustanoveService, 'compareUstanove');
        comp.compareUstanove(entity, entity2);
        expect(ustanoveService.compareUstanove).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
