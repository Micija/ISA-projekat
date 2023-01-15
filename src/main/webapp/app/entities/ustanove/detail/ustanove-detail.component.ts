import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUstanove } from '../ustanove.model';

@Component({
  selector: 'jhi-ustanove-detail',
  templateUrl: './ustanove-detail.component.html',
})
export class UstanoveDetailComponent implements OnInit {
  ustanove: IUstanove | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ustanove }) => {
      this.ustanove = ustanove;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
