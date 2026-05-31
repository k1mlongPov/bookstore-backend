export interface CreateUserRepositoryInput {
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    isActive: boolean;
    createdAt: Date;
}