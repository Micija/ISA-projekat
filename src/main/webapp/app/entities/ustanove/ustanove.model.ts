import { IPregled } from 'app/entities/pregled/pregled.model';

export interface IUstanove {
  id: number;
  ime?: string | null;
  pregled?: Pick<IPregled, 'id'> | null;
}

export type NewUstanove = Omit<IUstanove, 'id'> & { id: null };
