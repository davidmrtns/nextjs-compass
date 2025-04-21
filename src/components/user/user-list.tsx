'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { Chip } from '@mui/material';
import { User } from '@/types/user';
import { fetchWrapper } from '@/utils/fetch-wrapper';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await fetchWrapper<any>('/user', {
                    method: 'GET'
                });
                setUsers(res);
            }catch(error){
                console.error('Error fetching users:', error)
            }finally{
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="mb-6">
            <TableContainer component={Paper} className="shadow-lg rounded-xl">
                <Table>
                <TableHead className="bg-gray-100">
                    <TableRow>
                    <TableCell><strong>ID</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>E-mail</strong></TableCell>
                    <TableCell><strong>Type</strong></TableCell>
                    <TableCell><strong>Created at</strong></TableCell>
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
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;