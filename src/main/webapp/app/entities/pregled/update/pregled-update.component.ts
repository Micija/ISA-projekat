import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PregledFormService, PregledFormGroup } from './pregled-form.service';
import { IPregled } from '../pregled.model';
import { PregledService } from '../service/pregled.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';
import { TIP } from 'app/entities/enumerations/tip.model';

@Component({
  selector: 'jhi-pregled-update',
  templateUrl: './pregled-update.component.html',
})
export class PregledUpdateComponent implements OnInit {
  isSaving = false;
  pregled: IPregled | null = null;
  tIPValues = Object.keys(TIP);

  usersSharedCollection: IUser[] = [];

  editForm: PregledFormGroup = this.pregledFormService.createPregledFormGroup();

  constructor(
    protected pregledService: PregledService,
    protected pregledFormService: PregledFormService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

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

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, pregled.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.pregled?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
