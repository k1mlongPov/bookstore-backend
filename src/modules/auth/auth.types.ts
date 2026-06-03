export interface AuthUser {
    userId: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export interface AuthRequest extends Request {
    user: AuthUser;
}