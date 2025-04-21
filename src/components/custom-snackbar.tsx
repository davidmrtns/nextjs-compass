import { Alert, Snackbar } from "@mui/material";

interface CustomAlertProps {
    open: boolean;
    type: "success" | "error" | "warning" | "info";
    message: string;
    handleClose?: () => void;
}

const CustomSnackbar: React.FC<CustomAlertProps> = ({ open, type, message, handleClose }) => {
    return(
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;