import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_aleatoria';

export async function generateToken(user : User) {
    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' },
    );
    
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 dias
    });
}
