import { PrismaClient } from "@/generated/prisma";
import { User, UserRole } from "@/types/user";

const prisma = new PrismaClient();

export async function createUser(name: string, email: string, password: string, role: UserRole) {
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            role: role
        }
    });
    return newUser as User;
}

export async function getUsers(page: number, pageSize: number) {
    const users = await prisma.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
    }) as User[];
    const total = await prisma.user.count();
    return { users, total };
}

export async function getUser(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    return user as User;
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user as User;
}

export async function updateUser(id: number, name: string, email: string, password: string) {
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name: name,
            email: email,
            password: password,
        }
    });
    return updatedUser as User;
}

export async function deleteUser(id: number) {
    try{
        await prisma.user.delete({
            where: {
                id: id
            }
        });
    }catch(e){
        console.error(e);
        throw new Error("Error deleting user");
    }
}
