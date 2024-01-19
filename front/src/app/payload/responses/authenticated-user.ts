export default interface AuthenticatedUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
}
