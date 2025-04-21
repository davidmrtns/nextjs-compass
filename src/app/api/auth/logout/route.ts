import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieSet = await cookies();
    cookieSet.delete('token');

    return new Response(JSON.stringify({ message: 'Logout feito com sucesso' }), {
        status: 200,
    });
}