import { Alert } from "@mui/material";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface CustomAlertProps {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    type: "success" | "error" | "warning" | "info";
}

const CustomAlert: React.FC<CustomAlertProps> = ({ error, type }) => {
    return(
        error && (
            <Alert severity={type} sx={{ mt: 2 }}>
                {String(error.message)}
            </Alert>
        )
    );
}

export default CustomAlert;