import { UserRole } from '@/types/user';
import { getDecodedToken } from '@/utils/token-utils';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar: React.FC = async () => {
    const decodedToken = await getDecodedToken();

    return (
        <AppBar position="static" className="bg-blue-600">
            <Toolbar>
                <Typography variant="h6" className="flex-1">
                    <Link href="/" passHref>Next.js Compass</Link>
                </Typography>
                {decodedToken ? (
                    <>
                        {decodedToken.payload.role === UserRole.ADMIN && (
                            <Link href="/users" passHref>
                                <Button color="inherit" className="hover:bg-blue-700">
                                    Users
                                </Button>
                            </Link>
                        )}
                        <form action="/api/auth/logout" method="POST">
                            <Button type="submit" color="inherit" className="hover:bg-blue-700">
                                Logout
                            </Button>
                        </form>
                    </>
                ) : (
                    <Link href="/login" passHref>
                        <Button color="inherit" className="hover:bg-blue-700">
                            Login
                        </Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;