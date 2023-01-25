import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPregled, NewPregled } from '../pregled.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPregled for edit and NewPregledFormGroupInput for create.
 */
type PregledFormGroupInput = IPregled | PartialWithRequiredKeyOf<NewPregled>;

type PregledFormDefaults = Pick<NewPregled, 'id'>;

type PregledFormGroupContent = {
  id: FormControl<IPregled['id'] | NewPregled['id']>;
  ime: FormControl<IPregled['ime']>;
  tip: FormControl<IPregled['tip']>;
  pacijent: FormControl<IPregled['pacijent']>;
  ustanove: FormControl<IPregled['ustanove']>;
};

export type PregledFormGroup = FormGroup<PregledFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PregledFormService {
  createPregledFormGroup(pregled: PregledFormGroupInput = { id: null }): PregledFormGroup {
    const pregledRawValue = {
      ...this.getFormDefaults(),
      ...pregled,
    };
    return new FormGroup<PregledFormGroupContent>({
      id: new FormControl(
        { value: pregledRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ime: new FormControl(pregledRawValue.ime, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      tip: new FormControl(pregledRawValue.tip),
      pacijent: new FormControl(pregledRawValue.pacijent),
      ustanove: new FormControl(pregledRawValue.ustanove),
    });
  }

  getPregled(form: PregledFormGroup): IPregled | NewPregled {
    return form.getRawValue() as IPregled | NewPregled;
  }

  resetForm(form: PregledFormGroup, pregled: PregledFormGroupInput): void {
    const pregledRawValue = { ...this.getFormDefaults(), ...pregled };
    form.reset(
      {
        ...pregledRawValue,
        id: { value: pregledRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PregledFormDefaults {
    return {
      id: null,
    };
  }
}
