import dayjs from 'dayjs/esm';
import { POL } from 'app/entities/enumerations/pol.model';

export interface IPacijent {
  id: number;
  ime?: string | null;
  prezime?: string | null;
  jmbg?: string | null;
  adresa?: string | null;
  telefon?: string | null;
  email?: string | null;
  datumRodjenja?: dayjs.Dayjs | null;
  pol?: POL | null;
}

export type NewPacijent = Omit<IPacijent, 'id'> & { id: null };
