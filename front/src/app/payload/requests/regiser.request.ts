export default interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    state?: string;
    job? :string;
    city? :string;
    phone?: string;
  }
  