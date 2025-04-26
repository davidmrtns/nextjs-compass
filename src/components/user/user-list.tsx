import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getUsers } from '@/services/user.service';
import PaginationControls from '../pagination-controls';
import Link from 'next/link';

interface UserListProps {
    page?: number;
    pageSize?: number;
}

const UserList: React.FC<UserListProps> = async ({ page = 1, pageSize = 3 }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const { users, total } = await getUsers(page, pageSize);

    return (
        <Box sx={{ mb: 2 }}>
            <TableContainer className="shadow-lg rounded-xl" sx={{ backgroundColor: "#fafafa" }}>
                <Table>
                    <TableHead className="bg-gray-100">
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>E-mail</strong></TableCell>
                            <TableCell><strong>Type</strong></TableCell>
                            <TableCell><strong>Created at</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50 transition">
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'ADMIN' ? 'error' : 'primary'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    {user.created_at ? 
                                        new Date(user.created_at).toLocaleDateString('pt-BR') 
                                    : 
                                        "N/A"
                                    }
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Link href={`/users/${user.id}`} passHref>
                                            <VisibilityIcon color='primary' />
                                        </Link>
                                        <EditIcon color='primary' />
                                        <DeleteIcon color='error' />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationControls total={total} page={page} pageSize={pageSize} />
        </Box>
    );
};

export default UserList;