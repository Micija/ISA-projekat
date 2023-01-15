import { TIP } from 'app/entities/enumerations/tip.model';

import { IPregled, NewPregled } from './pregled.model';

export const sampleWithRequiredData: IPregled = {
  id: 18335,
  ime: 'THX',
};

export const sampleWithPartialData: IPregled = {
  id: 47960,
  ime: 'Security deposit SMTP',
};

export const sampleWithFullData: IPregled = {
  id: 24567,
  ime: 'payment SDD',
  tip: TIP['REDOVAN'],
};

export const sampleWithNewData: NewPregled = {
  ime: 'eyeballs Fundamental National',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
