import { Snackbar } from "@mui/material";
import React from "react";
import { useSnackbar } from "../hooks/use-alert-utils";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackBar() {
    const { snackbarClose, snackbarOpen, snackbarProps } = useSnackbar();

    return (
        <>
            {snackbarProps && (
                <Snackbar open={snackbarOpen} autoHideDuration={snackbarProps?.delay || 6000} onClose={snackbarClose}>
                    <Alert onClose={snackbarClose} severity={snackbarProps?.severity} sx={{ width: "100%" }}>
                        {snackbarProps?.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
