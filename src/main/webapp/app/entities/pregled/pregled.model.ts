import { IPacijent } from 'app/entities/pacijent/pacijent.model';
import { IUstanove } from 'app/entities/ustanove/ustanove.model';
import { TIP } from 'app/entities/enumerations/tip.model';

export interface IPregled {
  id: number;
  ime?: string | null;
  tip?: TIP | null;
  pacijent?: Pick<IPacijent, 'id'> | null;
  ustanove?: Pick<IUstanove, 'id'> | null;
}

export type NewPregled = Omit<IPregled, 'id'> & { id: null };
