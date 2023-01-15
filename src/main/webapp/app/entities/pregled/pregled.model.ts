import { IUser } from 'app/entities/user/user.model';
import { TIP } from 'app/entities/enumerations/tip.model';

export interface IPregled {
  id: number;
  ime?: string | null;
  tip?: TIP | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
}

export type NewPregled = Omit<IPregled, 'id'> & { id: null };
