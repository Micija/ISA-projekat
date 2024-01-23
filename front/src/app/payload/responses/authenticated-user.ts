export default interface AuthenticatedUser {
  id: string;
  firstName: string;
  jwt: string;
  role: string;
}
