import { cookies } from "next/headers";

export async function POST(request: Request) {
    const cookieSet = await cookies();
    cookieSet.delete('token');

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 302,
        headers: {
            Location: '/',
        }
    });
}