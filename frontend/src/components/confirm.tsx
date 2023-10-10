import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from "@mui/material";
import React from "react";
import { useConfirm } from "../hooks/use-alert-utils";

export function Confirm() {
    const { confirmClose, confirmOpen, confirmProps } = useConfirm();

    const handleConfirm = () => {
        confirmProps?.handleConfirm();
        confirmClose();
    }
    
    return (
        <Dialog
            open={confirmOpen}
            onClose={confirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    minWidth: "20rem",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{confirmProps?.title || "Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {
                        confirmProps?.description || "This action may be irreversible."
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmClose}>Disagree</Button>
                <Button onClick={handleConfirm} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
