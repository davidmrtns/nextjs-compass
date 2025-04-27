import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "@/types/user";
import { jwtVerify } from "jose";
import { DecodedToken } from "@/types/token";

const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_aleatoria'

export async function generateToken(user: User) {
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

export async function getDecodedToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token) return null;

    try{
        const decodedToken = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET)) as DecodedToken;
        return decodedToken;
    }catch(error){
        console.error('Error decoding token:', error);
        return null;
    }
}
