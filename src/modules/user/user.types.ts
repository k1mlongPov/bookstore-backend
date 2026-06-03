export interface CreateUserRepositoryInput {
    username: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone?: string;
}