import { fetchWrapper } from "@/utils/fetch-wrapper";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomAlert from "../custom-alert";

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try{
            await fetchWrapper<any>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            router.push('/');
        }catch(error){
            console.error('Login error:', error);
        }
    }

    return(
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <TextField
                        fullWidth
                        label="E-mail"
                        type="email"
                        id="email"
                        {...register("email", { required: "E-mail is required" })}
                        margin="normal"
                        required
                    />
                    <CustomAlert type="warning" error={errors.email} />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Senha"
                        type="password"
                        id="password"
                        {...register("password", { required: "Password is required" })}
                        margin="normal"
                        required
                    />
                    <CustomAlert type="warning" error={errors.password} />
                </div>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                    Entrar
                </Button>
            </Box>
        </Paper>
    );
}

export default LoginForm;