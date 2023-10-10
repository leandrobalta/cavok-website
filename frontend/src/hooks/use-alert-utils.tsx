import { useContext } from "react"
import { AlertUtilsContext } from "../context/alert-utils.context"

export const useSnackbar = () => useContext(AlertUtilsContext).snackBarValue;

export const useAlert = () => useContext(AlertUtilsContext).alertValue;

export const useConfirm = () => useContext(AlertUtilsContext).confirmValue;