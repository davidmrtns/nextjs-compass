'use client';

import { UserRole } from "@/types/user";
import { set, useForm } from "react-hook-form";
import { MenuItem, TextField, Button, Typography, CircularProgress } from "@mui/material";
import CustomAlert from "../custom-alert";
import CustomSnackbar from "../custom-snackbar";
import { useState } from "react";
import { fetchWrapper } from "@/utils/fetch-wrapper";

const UserForm: React.FC = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const roles = Object.values(UserRole);

    const onSubmit = async (data: any) => {
        setPending(true);

        try{
            await fetchWrapper<any>('/user', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            setMessage("User created successfully!");
            reset();
        }catch(error){
            console.error('Error creating user:', error);
            setMessage(`Error creating user: ${error}`);
        }finally{
            setShowMessage(true);
            setPending(false);
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.5em", backgroundColor: "#fafafa40", borderColor: "#fafafa50", borderWidth: "1px", padding: "2em", borderRadius: "8px" }}>
            <Typography variant="h6" align="left">
                Add user
            </Typography>
            <div>
                <TextField
                    label="Nome"
                    id="name"
                    fullWidth
                    {...register("name", { required: "Name is required" })}
                    slotProps={{ 
                        input: { sx: { color: "white" } }, 
                        inputLabel: { sx: { color: "#d9d9d9" } }
                    }}
                />
                <CustomAlert type="warning" error={errors.name} />
            </div>
            <div>
                <TextField
                    label="Email"
                    id="email"
                    type="email"
                    fullWidth
                    {...register("email", { required: "E-mail is required" })}
                    slotProps={{ 
                        input: { sx: { color: "white" } }, 
                        inputLabel: { sx: { color: "#d9d9d9" } }
                    }}
                />
                <CustomAlert type="warning" error={errors.email} />
            </div>
            <div>
                <TextField
                    label="Senha"
                    id="password"
                    type="password"
                    fullWidth
                    {...register("password", { required: "Password is required" })}
                    slotProps={{ 
                        input: { sx: { color: "white" } }, 
                        inputLabel: { sx: { color: "#d9d9d9" } }
                    }}
                />
                <CustomAlert type="warning" error={errors.password} />
            </div>
            <div>
                <TextField
                    select
                    label="Tipo de usuário"
                    id="role"
                    fullWidth
                    {...register("role", { required: "Role is required" })}
                    slotProps={{ 
                        input: { sx: { color: "white" } }, 
                        inputLabel: { sx: { color: "#d9d9d9" } }
                    }}
                    defaultValue={roles[0]}
                >
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </TextField>
                <CustomAlert type="warning" error={errors.role} />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={pending}>
                {pending ? 
                    <CircularProgress size={25} />
                : 
                    "Create user"
                }
            </Button>
            <CustomSnackbar open={showMessage} type={"success"} message={message} handleClose={() => setShowMessage(false)} />
        </form>
    );
}

export default UserForm;