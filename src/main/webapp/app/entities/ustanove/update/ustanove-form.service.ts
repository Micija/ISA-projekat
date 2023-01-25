import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUstanove, NewUstanove } from '../ustanove.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUstanove for edit and NewUstanoveFormGroupInput for create.
 */
type UstanoveFormGroupInput = IUstanove | PartialWithRequiredKeyOf<NewUstanove>;

type UstanoveFormDefaults = Pick<NewUstanove, 'id'>;

type UstanoveFormGroupContent = {
  id: FormControl<IUstanove['id'] | NewUstanove['id']>;
  ime: FormControl<IUstanove['ime']>;
  adresa: FormControl<IUstanove['adresa']>;
  telefon: FormControl<IUstanove['telefon']>;
  email: FormControl<IUstanove['email']>;
};

export type UstanoveFormGroup = FormGroup<UstanoveFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UstanoveFormService {
  createUstanoveFormGroup(ustanove: UstanoveFormGroupInput = { id: null }): UstanoveFormGroup {
    const ustanoveRawValue = {
      ...this.getFormDefaults(),
      ...ustanove,
    };
    return new FormGroup<UstanoveFormGroupContent>({
      id: new FormControl(
        { value: ustanoveRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ime: new FormControl(ustanoveRawValue.ime, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      adresa: new FormControl(ustanoveRawValue.adresa, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      telefon: new FormControl(ustanoveRawValue.telefon, {
        validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      }),
      email: new FormControl(ustanoveRawValue.email, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }

  getUstanove(form: UstanoveFormGroup): IUstanove | NewUstanove {
    return form.getRawValue() as IUstanove | NewUstanove;
  }

  resetForm(form: UstanoveFormGroup, ustanove: UstanoveFormGroupInput): void {
    const ustanoveRawValue = { ...this.getFormDefaults(), ...ustanove };
    form.reset(
      {
        ...ustanoveRawValue,
        id: { value: ustanoveRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UstanoveFormDefaults {
    return {
      id: null,
    };
  }
}
