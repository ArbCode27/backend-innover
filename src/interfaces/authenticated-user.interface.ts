export interface AuthenticatedUser extends Request {
  user: {
    userId: string;
    email: string;
  };
}
