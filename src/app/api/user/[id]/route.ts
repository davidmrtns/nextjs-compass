import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    const id = parseInt(context.params.id);
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    return new Response(JSON.stringify(user), {
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
    const body = await request.json();
    const { name, email, password } = body;
    const id = parseInt(context.params.id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        }
    });

    return new Response(JSON.stringify(updatedUser), {
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
    const id = parseInt(context.params.id);
    await prisma.user.delete({
        where: {
            id: id
        }
    });

    return new Response(JSON.stringify({ message: "User deleted" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
