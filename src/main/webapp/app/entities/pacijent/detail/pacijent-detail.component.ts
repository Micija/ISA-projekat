import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPacijent } from '../pacijent.model';

@Component({
  selector: 'jhi-pacijent-detail',
  templateUrl: './pacijent-detail.component.html',
})
export class PacijentDetailComponent implements OnInit {
  pacijent: IPacijent | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pacijent }) => {
      this.pacijent = pacijent;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
