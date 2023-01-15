import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UstanoveFormService, UstanoveFormGroup } from './ustanove-form.service';
import { IUstanove } from '../ustanove.model';
import { UstanoveService } from '../service/ustanove.service';
import { IPregled } from 'app/entities/pregled/pregled.model';
import { PregledService } from 'app/entities/pregled/service/pregled.service';

@Component({
  selector: 'jhi-ustanove-update',
  templateUrl: './ustanove-update.component.html',
})
export class UstanoveUpdateComponent implements OnInit {
  isSaving = false;
  ustanove: IUstanove | null = null;

  pregledsCollection: IPregled[] = [];

  editForm: UstanoveFormGroup = this.ustanoveFormService.createUstanoveFormGroup();

  constructor(
    protected ustanoveService: UstanoveService,
    protected ustanoveFormService: UstanoveFormService,
    protected pregledService: PregledService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePregled = (o1: IPregled | null, o2: IPregled | null): boolean => this.pregledService.comparePregled(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ustanove }) => {
      this.ustanove = ustanove;
      if (ustanove) {
        this.updateForm(ustanove);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ustanove = this.ustanoveFormService.getUstanove(this.editForm);
    if (ustanove.id !== null) {
      this.subscribeToSaveResponse(this.ustanoveService.update(ustanove));
    } else {
      this.subscribeToSaveResponse(this.ustanoveService.create(ustanove));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUstanove>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ustanove: IUstanove): void {
    this.ustanove = ustanove;
    this.ustanoveFormService.resetForm(this.editForm, ustanove);

    this.pregledsCollection = this.pregledService.addPregledToCollectionIfMissing<IPregled>(this.pregledsCollection, ustanove.pregled);
  }

  protected loadRelationshipsOptions(): void {
    this.pregledService
      .query({ filter: 'ustanove-is-null' })
      .pipe(map((res: HttpResponse<IPregled[]>) => res.body ?? []))
      .pipe(map((pregleds: IPregled[]) => this.pregledService.addPregledToCollectionIfMissing<IPregled>(pregleds, this.ustanove?.pregled)))
      .subscribe((pregleds: IPregled[]) => (this.pregledsCollection = pregleds));
  }
}
