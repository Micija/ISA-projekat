import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPacijent, NewPacijent } from '../pacijent.model';

export type PartialUpdatePacijent = Partial<IPacijent> & Pick<IPacijent, 'id'>;

type RestOf<T extends IPacijent | NewPacijent> = Omit<T, 'datumRodjenja'> & {
  datumRodjenja?: string | null;
};

export type RestPacijent = RestOf<IPacijent>;

export type NewRestPacijent = RestOf<NewPacijent>;

export type PartialUpdateRestPacijent = RestOf<PartialUpdatePacijent>;

export type EntityResponseType = HttpResponse<IPacijent>;
export type EntityArrayResponseType = HttpResponse<IPacijent[]>;

@Injectable({ providedIn: 'root' })
export class PacijentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pacijents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pacijent: NewPacijent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pacijent);
    return this.http
      .post<RestPacijent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(pacijent: IPacijent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pacijent);
    return this.http
      .put<RestPacijent>(`${this.resourceUrl}/${this.getPacijentIdentifier(pacijent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(pacijent: PartialUpdatePacijent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pacijent);
    return this.http
      .patch<RestPacijent>(`${this.resourceUrl}/${this.getPacijentIdentifier(pacijent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPacijent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPacijent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPacijentIdentifier(pacijent: Pick<IPacijent, 'id'>): number {
    return pacijent.id;
  }

  comparePacijent(o1: Pick<IPacijent, 'id'> | null, o2: Pick<IPacijent, 'id'> | null): boolean {
    return o1 && o2 ? this.getPacijentIdentifier(o1) === this.getPacijentIdentifier(o2) : o1 === o2;
  }

  addPacijentToCollectionIfMissing<Type extends Pick<IPacijent, 'id'>>(
    pacijentCollection: Type[],
    ...pacijentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pacijents: Type[] = pacijentsToCheck.filter(isPresent);
    if (pacijents.length > 0) {
      const pacijentCollectionIdentifiers = pacijentCollection.map(pacijentItem => this.getPacijentIdentifier(pacijentItem)!);
      const pacijentsToAdd = pacijents.filter(pacijentItem => {
        const pacijentIdentifier = this.getPacijentIdentifier(pacijentItem);
        if (pacijentCollectionIdentifiers.includes(pacijentIdentifier)) {
          return false;
        }
        pacijentCollectionIdentifiers.push(pacijentIdentifier);
        return true;
      });
      return [...pacijentsToAdd, ...pacijentCollection];
    }
    return pacijentCollection;
  }

  protected convertDateFromClient<T extends IPacijent | NewPacijent | PartialUpdatePacijent>(pacijent: T): RestOf<T> {
    return {
      ...pacijent,
      datumRodjenja: pacijent.datumRodjenja?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPacijent: RestPacijent): IPacijent {
    return {
      ...restPacijent,
      datumRodjenja: restPacijent.datumRodjenja ? dayjs(restPacijent.datumRodjenja) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPacijent>): HttpResponse<IPacijent> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPacijent[]>): HttpResponse<IPacijent[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
