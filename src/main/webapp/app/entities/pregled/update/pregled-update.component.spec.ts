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

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { PregledUpdateComponent } from './pregled-update.component';

describe('Pregled Management Update Component', () => {
  let comp: PregledUpdateComponent;
  let fixture: ComponentFixture<PregledUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pregledFormService: PregledFormService;
  let pregledService: PregledService;
  let userService: UserService;

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
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const pregled: IPregled = { id: 456 };
      const user: IUser = { id: 80020 };
      pregled.user = user;

      const userCollection: IUser[] = [{ id: 35041 }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [user];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(
        userCollection,
        ...additionalUsers.map(expect.objectContaining)
      );
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pregled: IPregled = { id: 456 };
      const user: IUser = { id: 72030 };
      pregled.user = user;

      activatedRoute.data = of({ pregled });
      comp.ngOnInit();

      expect(comp.usersSharedCollection).toContain(user);
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
    describe('compareUser', () => {
      it('Should forward to userService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userService, 'compareUser');
        comp.compareUser(entity, entity2);
        expect(userService.compareUser).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
