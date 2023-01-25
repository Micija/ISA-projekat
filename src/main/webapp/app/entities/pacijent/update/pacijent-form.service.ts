import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPacijent, NewPacijent } from '../pacijent.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPacijent for edit and NewPacijentFormGroupInput for create.
 */
type PacijentFormGroupInput = IPacijent | PartialWithRequiredKeyOf<NewPacijent>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPacijent | NewPacijent> = Omit<T, 'datumRodjenja'> & {
  datumRodjenja?: string | null;
};

type PacijentFormRawValue = FormValueOf<IPacijent>;

type NewPacijentFormRawValue = FormValueOf<NewPacijent>;

type PacijentFormDefaults = Pick<NewPacijent, 'id' | 'datumRodjenja'>;

type PacijentFormGroupContent = {
  id: FormControl<PacijentFormRawValue['id'] | NewPacijent['id']>;
  ime: FormControl<PacijentFormRawValue['ime']>;
  prezime: FormControl<PacijentFormRawValue['prezime']>;
  jmbg: FormControl<PacijentFormRawValue['jmbg']>;
  adresa: FormControl<PacijentFormRawValue['adresa']>;
  telefon: FormControl<PacijentFormRawValue['telefon']>;
  email: FormControl<PacijentFormRawValue['email']>;
  datumRodjenja: FormControl<PacijentFormRawValue['datumRodjenja']>;
  pol: FormControl<PacijentFormRawValue['pol']>;
};

export type PacijentFormGroup = FormGroup<PacijentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PacijentFormService {
  createPacijentFormGroup(pacijent: PacijentFormGroupInput = { id: null }): PacijentFormGroup {
    const pacijentRawValue = this.convertPacijentToPacijentRawValue({
      ...this.getFormDefaults(),
      ...pacijent,
    });
    return new FormGroup<PacijentFormGroupContent>({
      id: new FormControl(
        { value: pacijentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ime: new FormControl(pacijentRawValue.ime, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      prezime: new FormControl(pacijentRawValue.prezime, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      jmbg: new FormControl(pacijentRawValue.jmbg, {
        validators: [Validators.required, Validators.minLength(13), Validators.maxLength(13)],
      }),
      adresa: new FormControl(pacijentRawValue.adresa, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      telefon: new FormControl(pacijentRawValue.telefon, {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      }),
      email: new FormControl(pacijentRawValue.email, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      datumRodjenja: new FormControl(pacijentRawValue.datumRodjenja, {
        validators: [Validators.required],
      }),
      pol: new FormControl(pacijentRawValue.pol),
    });
  }

  getPacijent(form: PacijentFormGroup): IPacijent | NewPacijent {
    return this.convertPacijentRawValueToPacijent(form.getRawValue() as PacijentFormRawValue | NewPacijentFormRawValue);
  }

  resetForm(form: PacijentFormGroup, pacijent: PacijentFormGroupInput): void {
    const pacijentRawValue = this.convertPacijentToPacijentRawValue({ ...this.getFormDefaults(), ...pacijent });
    form.reset(
      {
        ...pacijentRawValue,
        id: { value: pacijentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PacijentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      datumRodjenja: currentTime,
    };
  }

  private convertPacijentRawValueToPacijent(rawPacijent: PacijentFormRawValue | NewPacijentFormRawValue): IPacijent | NewPacijent {
    return {
      ...rawPacijent,
      datumRodjenja: dayjs(rawPacijent.datumRodjenja, DATE_TIME_FORMAT),
    };
  }

  private convertPacijentToPacijentRawValue(
    pacijent: IPacijent | (Partial<NewPacijent> & PacijentFormDefaults)
  ): PacijentFormRawValue | PartialWithRequiredKeyOf<NewPacijentFormRawValue> {
    return {
      ...pacijent,
      datumRodjenja: pacijent.datumRodjenja ? pacijent.datumRodjenja.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
