import { IUstanove, NewUstanove } from './ustanove.model';

export const sampleWithRequiredData: IUstanove = {
  id: 7298,
  ime: 'Books',
  adresa: 'Self-enabling frictionless programming',
  telefon: 'Greens fu',
  email: 'Brandyn94@yahoo.com',
};

export const sampleWithPartialData: IUstanove = {
  id: 85655,
  ime: 'motivating Ball lime',
  adresa: 'invoice Technician hacking',
  telefon: 'PCI quant',
  email: 'Colby.Mueller29@yahoo.com',
};

export const sampleWithFullData: IUstanove = {
  id: 31490,
  ime: 'transmitting Response',
  adresa: 'Bedfordshire architecture',
  telefon: 'SAS Sausa',
  email: 'Ryann_Marks@hotmail.com',
};

export const sampleWithNewData: NewUstanove = {
  ime: 'Sausages Industrial Rustic',
  adresa: 'Buckinghamshire',
  telefon: 'fresh-thi',
  email: 'Roosevelt43@hotmail.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
