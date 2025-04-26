import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getUsers } from '@/services/user.service';
import PaginationControls from '../pagination-controls';

interface UserListProps {
    page?: number;
    pageSize?: number;
}

const UserList: React.FC<UserListProps> = async ({ page = 1, pageSize = 10 }) => {
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
                                <TableCell sx={{ display: "flex", gap: 1 }}>
                                    <Button variant="outlined" color="error">
                                        <DeleteIcon />
                                    </Button>
                                    <Button variant="outlined" color="info">
                                        <EditIcon />
                                    </Button>
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