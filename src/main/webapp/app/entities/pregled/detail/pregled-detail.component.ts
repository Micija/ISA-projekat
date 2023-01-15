import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPregled } from '../pregled.model';

@Component({
  selector: 'jhi-pregled-detail',
  templateUrl: './pregled-detail.component.html',
})
export class PregledDetailComponent implements OnInit {
  pregled: IPregled | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pregled }) => {
      this.pregled = pregled;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
