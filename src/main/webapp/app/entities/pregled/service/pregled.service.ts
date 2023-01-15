import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPregled, NewPregled } from '../pregled.model';

export type PartialUpdatePregled = Partial<IPregled> & Pick<IPregled, 'id'>;

export type EntityResponseType = HttpResponse<IPregled>;
export type EntityArrayResponseType = HttpResponse<IPregled[]>;

@Injectable({ providedIn: 'root' })
export class PregledService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pregleds');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pregled: NewPregled): Observable<EntityResponseType> {
    return this.http.post<IPregled>(this.resourceUrl, pregled, { observe: 'response' });
  }

  update(pregled: IPregled): Observable<EntityResponseType> {
    return this.http.put<IPregled>(`${this.resourceUrl}/${this.getPregledIdentifier(pregled)}`, pregled, { observe: 'response' });
  }

  partialUpdate(pregled: PartialUpdatePregled): Observable<EntityResponseType> {
    return this.http.patch<IPregled>(`${this.resourceUrl}/${this.getPregledIdentifier(pregled)}`, pregled, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPregled>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPregled[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPregledIdentifier(pregled: Pick<IPregled, 'id'>): number {
    return pregled.id;
  }

  comparePregled(o1: Pick<IPregled, 'id'> | null, o2: Pick<IPregled, 'id'> | null): boolean {
    return o1 && o2 ? this.getPregledIdentifier(o1) === this.getPregledIdentifier(o2) : o1 === o2;
  }

  addPregledToCollectionIfMissing<Type extends Pick<IPregled, 'id'>>(
    pregledCollection: Type[],
    ...pregledsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pregleds: Type[] = pregledsToCheck.filter(isPresent);
    if (pregleds.length > 0) {
      const pregledCollectionIdentifiers = pregledCollection.map(pregledItem => this.getPregledIdentifier(pregledItem)!);
      const pregledsToAdd = pregleds.filter(pregledItem => {
        const pregledIdentifier = this.getPregledIdentifier(pregledItem);
        if (pregledCollectionIdentifiers.includes(pregledIdentifier)) {
          return false;
        }
        pregledCollectionIdentifiers.push(pregledIdentifier);
        return true;
      });
      return [...pregledsToAdd, ...pregledCollection];
    }
    return pregledCollection;
  }
}
