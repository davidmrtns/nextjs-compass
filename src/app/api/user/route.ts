import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany();

    return new Response(JSON.stringify(users), {
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

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        }
    });

    return new Response(JSON.stringify(newUser), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
