export interface AuthUser {
    userId: string;
    roles: string[];
}

export interface AuthRequest extends Request {
    user?: AuthUser;
}