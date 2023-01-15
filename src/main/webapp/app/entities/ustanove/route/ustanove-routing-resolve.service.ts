import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUstanove } from '../ustanove.model';
import { UstanoveService } from '../service/ustanove.service';

@Injectable({ providedIn: 'root' })
export class UstanoveRoutingResolveService implements Resolve<IUstanove | null> {
  constructor(protected service: UstanoveService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUstanove | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ustanove: HttpResponse<IUstanove>) => {
          if (ustanove.body) {
            return of(ustanove.body);
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
