import { IUstanove, NewUstanove } from './ustanove.model';

export const sampleWithRequiredData: IUstanove = {
  id: 7298,
  ime: 'Books',
};

export const sampleWithPartialData: IUstanove = {
  id: 96382,
  ime: '1080p',
};

export const sampleWithFullData: IUstanove = {
  id: 32714,
  ime: 'programming',
};

export const sampleWithNewData: NewUstanove = {
  ime: 'Greens fuchsia calculate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
