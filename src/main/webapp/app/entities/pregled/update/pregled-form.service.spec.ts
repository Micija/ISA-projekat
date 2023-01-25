import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pregled.test-samples';

import { PregledFormService } from './pregled-form.service';

describe('Pregled Form Service', () => {
  let service: PregledFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledFormService);
  });

  describe('Service methods', () => {
    describe('createPregledFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPregledFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ime: expect.any(Object),
            tip: expect.any(Object),
            pacijent: expect.any(Object),
            ustanove: expect.any(Object),
          })
        );
      });

      it('passing IPregled should create a new form with FormGroup', () => {
        const formGroup = service.createPregledFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ime: expect.any(Object),
            tip: expect.any(Object),
            pacijent: expect.any(Object),
            ustanove: expect.any(Object),
          })
        );
      });
    });

    describe('getPregled', () => {
      it('should return NewPregled for default Pregled initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPregledFormGroup(sampleWithNewData);

        const pregled = service.getPregled(formGroup) as any;

        expect(pregled).toMatchObject(sampleWithNewData);
      });

      it('should return NewPregled for empty Pregled initial value', () => {
        const formGroup = service.createPregledFormGroup();

        const pregled = service.getPregled(formGroup) as any;

        expect(pregled).toMatchObject({});
      });

      it('should return IPregled', () => {
        const formGroup = service.createPregledFormGroup(sampleWithRequiredData);

        const pregled = service.getPregled(formGroup) as any;

        expect(pregled).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPregled should not enable id FormControl', () => {
        const formGroup = service.createPregledFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPregled should disable id FormControl', () => {
        const formGroup = service.createPregledFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
