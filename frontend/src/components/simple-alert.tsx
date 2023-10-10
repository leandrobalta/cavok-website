import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from "@mui/material";
import React from "react";
import { useAlert } from "../hooks/use-alert-utils";

export function SimpleAlert() {
    const { alertClose, alertOpen, alertProps } = useAlert();

    return (
        <Dialog
            open={alertOpen}
            onClose={alertClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    minWidth: "20rem",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{alertProps?.title || `${window.location.hostname} says`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertProps?.description.split("\n").map((message) => (
                        <React.Fragment key={message}>
                            {message}
                            <br />
                        </React.Fragment>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={alertClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}
