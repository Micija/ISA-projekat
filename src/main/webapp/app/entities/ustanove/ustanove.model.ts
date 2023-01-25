export interface IUstanove {
  id: number;
  ime?: string | null;
  adresa?: string | null;
  telefon?: string | null;
  email?: string | null;
}

export type NewUstanove = Omit<IUstanove, 'id'> & { id: null };
