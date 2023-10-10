import { createContext, useEffect, useState } from "react";
import { Confirm } from "../components/confirm";
import { SimpleAlert } from "../components/simple-alert";
import { SnackBar } from "../components/snackbar";

export interface AlertProps {
    title?: string;
    description: string;
}

export interface ConfirmProps {
    handleConfirm: () => any;
    title?: string;
    description?: string;
}

export interface SnackBarProps {
    message: string;
    severity: "success" | "info" | "warning" | "error";
    delay?: number;
}

export interface AlertUtilsContextProps {
    alertValue: {
        alertOpen: boolean;
        alertClose: () => void;
        simpleAlert: (props: AlertProps) => void;
        alertProps?: AlertProps;
    }

    confirmValue: {
        confirmOpen: boolean;
        confirmClose: () => void;
        confirm: (props: ConfirmProps) => void;
        confirmProps?: ConfirmProps;
    }

    snackBarValue: {
        snackbarOpen: boolean;
        snackbarClose: () => void;
        snackbar: (props: SnackBarProps) => void;
        snackbarProps?: SnackBarProps;
    }
}

export const AlertUtilsContext = createContext<AlertUtilsContextProps>({
    alertValue: {
        alertOpen: false,
        alertClose: () => {},
        simpleAlert: (_props: AlertProps) => {},
        alertProps: {
            description: "",
        },
    },

    confirmValue: {
        confirmOpen: false,
        confirmClose: () => {},
        confirm: (_props: ConfirmProps) => {},
        confirmProps: {
            handleConfirm: () => {}
        },
    },

    snackBarValue: {
        snackbarOpen: false,
        snackbarClose: () => {},
        snackbar: (_props: SnackBarProps) => {},
        snackbarProps: {
            message: "",
            severity: "info"
        } 
    }
});

export function AlertUtilsProvider({ children }: any) {
    // alert
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertProps, setAlertProps] = useState<AlertProps | undefined>();

    const alertClose = () => {
        setAlertOpen(false);
    };

    const alert = (props: AlertProps) => {
        setAlertOpen(true);
        setAlertProps(props);

        return alertProps;
    }

    // confirm
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmProps, setConfirmProps] = useState<ConfirmProps | undefined>();

    const confirmClose = () => {
        setConfirmOpen(false);
    };

    const confirm = (props: ConfirmProps) => {
        setConfirmOpen(true);
        setConfirmProps(props);

        return confirmProps;
    }

    // snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState<SnackBarProps | undefined>();

    const snackbarClose = () => {
        setSnackbarOpen(false);
    };

    const snackbar = (props: SnackBarProps) => {
        setSnackbarOpen(true);
        setSnackbarProps(props);

        return snackbarProps;
    }

    useEffect(() => {
        if (!snackbarOpen) {
            setSnackbarProps(undefined);
        }

        if(!confirmOpen) {
            setConfirmProps(undefined);
        }

        if(!alertOpen) {
            setAlertProps(undefined);
        }

    }, [snackbarOpen, confirmProps, alertProps])

    return (
        <AlertUtilsContext.Provider value={{
            alertValue: {
                alertOpen,
                alertClose,
                simpleAlert: alert,
                alertProps
            },
            confirmValue: {
                confirmOpen,
                confirmClose,
                confirm,
                confirmProps
            },
            snackBarValue: {
                snackbarOpen,
                snackbarClose,
                snackbar,
                snackbarProps
            }
        }}>
            <SimpleAlert />
            <Confirm />
            <SnackBar />
            {children}
        </AlertUtilsContext.Provider> 

    )
}