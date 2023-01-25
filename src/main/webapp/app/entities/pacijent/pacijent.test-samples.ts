import dayjs from 'dayjs/esm';

import { POL } from 'app/entities/enumerations/pol.model';

import { IPacijent, NewPacijent } from './pacijent.model';

export const sampleWithRequiredData: IPacijent = {
  id: 55305,
  ime: 'Franc green payment',
  prezime: 'Brand',
  jmbg: 'BerkshireXXXX',
  adresa: 'Cotton',
  telefon: 'reboot In',
  email: 'Ona_Rice@gmail.com',
  datumRodjenja: dayjs('2023-01-24T14:21'),
};

export const sampleWithPartialData: IPacijent = {
  id: 30634,
  ime: 'Investment',
  prezime: 'pixel Dynamic',
  jmbg: 'calculate Dol',
  adresa: 'Handmade',
  telefon: 'ComputerX',
  email: 'Kenna_Volkman@gmail.com',
  datumRodjenja: dayjs('2023-01-24T09:03'),
  pol: POL['ZENSKO'],
};

export const sampleWithFullData: IPacijent = {
  id: 97347,
  ime: 'Tennessee',
  prezime: 'CSS 24/365',
  jmbg: 'VirtualXXXXXX',
  adresa: 'Coordinator Pizza projection',
  telefon: 'ShoreXXXX',
  email: 'Joannie_Murray51@gmail.com',
  datumRodjenja: dayjs('2023-01-24T06:10'),
  pol: POL['ZENSKO'],
};

export const sampleWithNewData: NewPacijent = {
  ime: 'Books hack',
  prezime: 'virtual customer Pants',
  jmbg: 'VistaXXXXXXXX',
  adresa: 'bypass',
  telefon: 'Bedfordsh',
  email: 'Joelle_Stehr@yahoo.com',
  datumRodjenja: dayjs('2023-01-24T14:20'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
