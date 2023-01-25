import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PregledFormService, PregledFormGroup } from './pregled-form.service';
import { IPregled } from '../pregled.model';
import { PregledService } from '../service/pregled.service';
import { IPacijent } from 'app/entities/pacijent/pacijent.model';
import { PacijentService } from 'app/entities/pacijent/service/pacijent.service';
import { IUstanove } from 'app/entities/ustanove/ustanove.model';
import { UstanoveService } from 'app/entities/ustanove/service/ustanove.service';
import { TIP } from 'app/entities/enumerations/tip.model';

@Component({
  selector: 'jhi-pregled-update',
  templateUrl: './pregled-update.component.html',
})
export class PregledUpdateComponent implements OnInit {
  isSaving = false;
  pregled: IPregled | null = null;
  tIPValues = Object.keys(TIP);

  pacijentsSharedCollection: IPacijent[] = [];
  ustanovesSharedCollection: IUstanove[] = [];

  editForm: PregledFormGroup = this.pregledFormService.createPregledFormGroup();

  constructor(
    protected pregledService: PregledService,
    protected pregledFormService: PregledFormService,
    protected pacijentService: PacijentService,
    protected ustanoveService: UstanoveService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePacijent = (o1: IPacijent | null, o2: IPacijent | null): boolean => this.pacijentService.comparePacijent(o1, o2);

  compareUstanove = (o1: IUstanove | null, o2: IUstanove | null): boolean => this.ustanoveService.compareUstanove(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pregled }) => {
      this.pregled = pregled;
      if (pregled) {
        this.updateForm(pregled);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pregled = this.pregledFormService.getPregled(this.editForm);
    if (pregled.id !== null) {
      this.subscribeToSaveResponse(this.pregledService.update(pregled));
    } else {
      this.subscribeToSaveResponse(this.pregledService.create(pregled));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPregled>>): void {
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

  protected updateForm(pregled: IPregled): void {
    this.pregled = pregled;
    this.pregledFormService.resetForm(this.editForm, pregled);

    this.pacijentsSharedCollection = this.pacijentService.addPacijentToCollectionIfMissing<IPacijent>(
      this.pacijentsSharedCollection,
      pregled.pacijent
    );
    this.ustanovesSharedCollection = this.ustanoveService.addUstanoveToCollectionIfMissing<IUstanove>(
      this.ustanovesSharedCollection,
      pregled.ustanove
    );
  }

  protected loadRelationshipsOptions(): void {
    this.pacijentService
      .query()
      .pipe(map((res: HttpResponse<IPacijent[]>) => res.body ?? []))
      .pipe(
        map((pacijents: IPacijent[]) => this.pacijentService.addPacijentToCollectionIfMissing<IPacijent>(pacijents, this.pregled?.pacijent))
      )
      .subscribe((pacijents: IPacijent[]) => (this.pacijentsSharedCollection = pacijents));

    this.ustanoveService
      .query()
      .pipe(map((res: HttpResponse<IUstanove[]>) => res.body ?? []))
      .pipe(
        map((ustanoves: IUstanove[]) => this.ustanoveService.addUstanoveToCollectionIfMissing<IUstanove>(ustanoves, this.pregled?.ustanove))
      )
      .subscribe((ustanoves: IUstanove[]) => (this.ustanovesSharedCollection = ustanoves));
  }
}
