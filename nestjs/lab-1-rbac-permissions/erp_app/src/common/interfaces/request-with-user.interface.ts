export interface RequestWithUser extends Request {
  user?: {
    permissions?: string[];
  };
}
