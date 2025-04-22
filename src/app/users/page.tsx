import UserForm from "@/components/user/user-form";
import UserList from "@/components/user/user-list";

export default function UsersPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold underline pb-4">Users</h1>
            <UserList />
            <UserForm />
        </div>
    );
}