interface Address {
  id: number;
  streetName: string
  streetNumber: string;
  city: string;
  state: string;
}

export default interface CenterResponse {
  id: number;
  name: string;
  address: Address;
  description: string;
  averageRate: number;
}
