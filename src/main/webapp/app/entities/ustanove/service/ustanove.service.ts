import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUstanove, NewUstanove } from '../ustanove.model';

export type PartialUpdateUstanove = Partial<IUstanove> & Pick<IUstanove, 'id'>;

export type EntityResponseType = HttpResponse<IUstanove>;
export type EntityArrayResponseType = HttpResponse<IUstanove[]>;

@Injectable({ providedIn: 'root' })
export class UstanoveService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ustanoves');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(ustanove: NewUstanove): Observable<EntityResponseType> {
    return this.http.post<IUstanove>(this.resourceUrl, ustanove, { observe: 'response' });
  }

  update(ustanove: IUstanove): Observable<EntityResponseType> {
    return this.http.put<IUstanove>(`${this.resourceUrl}/${this.getUstanoveIdentifier(ustanove)}`, ustanove, { observe: 'response' });
  }

  partialUpdate(ustanove: PartialUpdateUstanove): Observable<EntityResponseType> {
    return this.http.patch<IUstanove>(`${this.resourceUrl}/${this.getUstanoveIdentifier(ustanove)}`, ustanove, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUstanove>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUstanove[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUstanoveIdentifier(ustanove: Pick<IUstanove, 'id'>): number {
    return ustanove.id;
  }

  compareUstanove(o1: Pick<IUstanove, 'id'> | null, o2: Pick<IUstanove, 'id'> | null): boolean {
    return o1 && o2 ? this.getUstanoveIdentifier(o1) === this.getUstanoveIdentifier(o2) : o1 === o2;
  }

  addUstanoveToCollectionIfMissing<Type extends Pick<IUstanove, 'id'>>(
    ustanoveCollection: Type[],
    ...ustanovesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ustanoves: Type[] = ustanovesToCheck.filter(isPresent);
    if (ustanoves.length > 0) {
      const ustanoveCollectionIdentifiers = ustanoveCollection.map(ustanoveItem => this.getUstanoveIdentifier(ustanoveItem)!);
      const ustanovesToAdd = ustanoves.filter(ustanoveItem => {
        const ustanoveIdentifier = this.getUstanoveIdentifier(ustanoveItem);
        if (ustanoveCollectionIdentifiers.includes(ustanoveIdentifier)) {
          return false;
        }
        ustanoveCollectionIdentifiers.push(ustanoveIdentifier);
        return true;
      });
      return [...ustanovesToAdd, ...ustanoveCollection];
    }
    return ustanoveCollection;
  }
}
