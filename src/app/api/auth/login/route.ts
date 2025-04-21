import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/token.service";
import { User, UserRole } from "@/types/user";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    const dbUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    let user: User | null = null;
    if(dbUser){
        user = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            password: dbUser.password,
            role: dbUser.role as UserRole,
            created_at: dbUser.created_at,
            updated_at: dbUser.updated_at
        };
    }

    if (!user){
        return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), {
            status: 404,
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: 'Senha incorreta' }), {
        status: 401,
    });
    }

    await generateToken(user);

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
    });
}