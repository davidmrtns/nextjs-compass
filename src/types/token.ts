import { UserRole } from "./user";

export interface DecodedToken {
    payload: TokenPayload;
}

interface TokenPayload {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}
