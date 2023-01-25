import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../pacijent.test-samples';

import { PacijentFormService } from './pacijent-form.service';

describe('Pacijent Form Service', () => {
  let service: PacijentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacijentFormService);
  });

  describe('Service methods', () => {
    describe('createPacijentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPacijentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ime: expect.any(Object),
            prezime: expect.any(Object),
            jmbg: expect.any(Object),
            adresa: expect.any(Object),
            telefon: expect.any(Object),
            email: expect.any(Object),
            datumRodjenja: expect.any(Object),
            pol: expect.any(Object),
          })
        );
      });

      it('passing IPacijent should create a new form with FormGroup', () => {
        const formGroup = service.createPacijentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ime: expect.any(Object),
            prezime: expect.any(Object),
            jmbg: expect.any(Object),
            adresa: expect.any(Object),
            telefon: expect.any(Object),
            email: expect.any(Object),
            datumRodjenja: expect.any(Object),
            pol: expect.any(Object),
          })
        );
      });
    });

    describe('getPacijent', () => {
      it('should return NewPacijent for default Pacijent initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPacijentFormGroup(sampleWithNewData);

        const pacijent = service.getPacijent(formGroup) as any;

        expect(pacijent).toMatchObject(sampleWithNewData);
      });

      it('should return NewPacijent for empty Pacijent initial value', () => {
        const formGroup = service.createPacijentFormGroup();

        const pacijent = service.getPacijent(formGroup) as any;

        expect(pacijent).toMatchObject({});
      });

      it('should return IPacijent', () => {
        const formGroup = service.createPacijentFormGroup(sampleWithRequiredData);

        const pacijent = service.getPacijent(formGroup) as any;

        expect(pacijent).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPacijent should not enable id FormControl', () => {
        const formGroup = service.createPacijentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPacijent should disable id FormControl', () => {
        const formGroup = service.createPacijentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
