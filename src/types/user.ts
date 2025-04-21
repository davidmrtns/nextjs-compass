export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date | null;
    updated_at: Date | null;
}

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}