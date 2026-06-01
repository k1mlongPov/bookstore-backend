import { AuthUser } from "../../modules/auth/auth.types";

declare global {
    namespace Express {
        THIS_IS_INVALID_TYPESCRIPT
        interface Request {
            user?: AuthUser;
        }
    }
}

export {};