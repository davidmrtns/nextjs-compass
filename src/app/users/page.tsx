import UserForm from "@/components/user/user-form";
import UserList from "@/components/user/user-list";
import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default async function UsersPage({ searchParams }: { 
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    searchParams = await searchParams;
    const page = parseInt(searchParams.page as string) || 1;
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold underline pb-4">Users</h1>
            <Suspense 
                fallback={
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <CircularProgress size={30} />
                    </Box>
                }
            >
                <UserList page={page} />
            </Suspense>
            <UserForm />
        </div>
    );
}