import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ustanove.test-samples';

import { UstanoveFormService } from './ustanove-form.service';

describe('Ustanove Form Service', () => {
  let service: UstanoveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UstanoveFormService);
  });

  describe('Service methods', () => {
    describe('createUstanoveFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUstanoveFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ime: expect.any(Object),
            adresa: expect.any(Object),
            telefon: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });

      it('passing IUstanove should create a new form with FormGroup', () => {
        const formGroup = service.createUstanoveFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ime: expect.any(Object),
            adresa: expect.any(Object),
            telefon: expect.any(Object),
            email: expect.any(Object),
          })
        );
      });
    });

    describe('getUstanove', () => {
      it('should return NewUstanove for default Ustanove initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUstanoveFormGroup(sampleWithNewData);

        const ustanove = service.getUstanove(formGroup) as any;

        expect(ustanove).toMatchObject(sampleWithNewData);
      });

      it('should return NewUstanove for empty Ustanove initial value', () => {
        const formGroup = service.createUstanoveFormGroup();

        const ustanove = service.getUstanove(formGroup) as any;

        expect(ustanove).toMatchObject({});
      });

      it('should return IUstanove', () => {
        const formGroup = service.createUstanoveFormGroup(sampleWithRequiredData);

        const ustanove = service.getUstanove(formGroup) as any;

        expect(ustanove).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUstanove should not enable id FormControl', () => {
        const formGroup = service.createUstanoveFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUstanove should disable id FormControl', () => {
        const formGroup = service.createUstanoveFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
