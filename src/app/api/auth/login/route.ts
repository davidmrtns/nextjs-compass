import bcrypt from "bcrypt";
import { generateToken } from "@/utils/token-utils";
import { getUserByEmail } from "@/services/user.service";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    const user = await getUserByEmail(email);

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