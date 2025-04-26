import { Container } from '@mui/material';
import LoginForm from '@/components/login/login-form';

export default function LoginPage() {
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <LoginForm />
        </Container>
    );
}