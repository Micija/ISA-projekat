import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PacijentFormService, PacijentFormGroup } from './pacijent-form.service';
import { IPacijent } from '../pacijent.model';
import { PacijentService } from '../service/pacijent.service';
import { POL } from 'app/entities/enumerations/pol.model';

@Component({
  selector: 'jhi-pacijent-update',
  templateUrl: './pacijent-update.component.html',
})
export class PacijentUpdateComponent implements OnInit {
  isSaving = false;
  pacijent: IPacijent | null = null;
  pOLValues = Object.keys(POL);

  editForm: PacijentFormGroup = this.pacijentFormService.createPacijentFormGroup();

  constructor(
    protected pacijentService: PacijentService,
    protected pacijentFormService: PacijentFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pacijent }) => {
      this.pacijent = pacijent;
      if (pacijent) {
        this.updateForm(pacijent);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pacijent = this.pacijentFormService.getPacijent(this.editForm);
    if (pacijent.id !== null) {
      this.subscribeToSaveResponse(this.pacijentService.update(pacijent));
    } else {
      this.subscribeToSaveResponse(this.pacijentService.create(pacijent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPacijent>>): void {
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

  protected updateForm(pacijent: IPacijent): void {
    this.pacijent = pacijent;
    this.pacijentFormService.resetForm(this.editForm, pacijent);
  }
}
