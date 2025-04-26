import { PrismaClient } from "@/generated/prisma";
import { deleteUser, getUser, updateUser } from "@/services/user.service";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    const { params } = await context;
    const id = parseInt(params.id);

    const response = await getUser(id);

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function PUT(
    request: Request,
    context: { params: { id: string } }
) {
    const { params } = await context;
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await updateUser(id, name, email, hashedPassword);

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function DELETE(
    request: Request,
    context: { params: { id: string } }
) {
    const { params } = await context;
    const id = parseInt(params.id);

    try{
        await deleteUser(id);

        return new Response(JSON.stringify({ message: "User deleted" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }catch(e){
        return new Response(JSON.stringify({ message: "Error deleting user" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    
}
