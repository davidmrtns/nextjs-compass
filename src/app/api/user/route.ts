import { createUser, getUsers } from "@/services/user.service";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const response = await getUsers(page, pageSize);

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password, role } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await createUser(name, email, hashedPassword, role);

    return new Response(JSON.stringify(response), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
