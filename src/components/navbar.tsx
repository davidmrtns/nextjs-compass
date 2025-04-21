'use client';

import { rootRoute } from '@/middleware';
import { fetchWrapper } from '@/utils/fetch-wrapper';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomSnackbar from './custom-snackbar';
import { useState } from 'react';

const Navbar = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    
    const router = useRouter();

    const logout = async () => {
        try {
            await fetchWrapper<any>('/auth/logout', {
                method: 'POST'
            });

            router.push(rootRoute);
        } catch (error) {
            setMessage(`An error occurred during logout: ${error}`);
        }
    };

    return (
        <AppBar position="static" className="bg-blue-600">
            <Toolbar>
                <Typography variant="h6" className="flex-1">
                    <Link href="/" passHref>Next.js Compass</Link>
                </Typography>
                <Link href="/users" passHref>
                    <Button color="inherit" className="hover:bg-blue-700">
                        Users
                    </Button>
                </Link>
                <Button onClick={() => logout()} color="inherit" className="hover:bg-blue-700">
                    Logout
                </Button>
            </Toolbar>
            <CustomSnackbar type="error" message={message} open={showMessage} handleClose={() => setShowMessage(false)} />
        </AppBar>
    );
};

export default Navbar;