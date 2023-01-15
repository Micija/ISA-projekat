import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPregled } from '../pregled.model';
import { PregledService } from '../service/pregled.service';

@Injectable({ providedIn: 'root' })
export class PregledRoutingResolveService implements Resolve<IPregled | null> {
  constructor(protected service: PregledService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPregled | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pregled: HttpResponse<IPregled>) => {
          if (pregled.body) {
            return of(pregled.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
