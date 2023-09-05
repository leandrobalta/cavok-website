// create a new alert component using toast from react bootstrap
import React from 'react';
import { Toast } from 'react-bootstrap';

interface AlertProps {
    message: string;
    title?: string;
    customVariant?: string;
    confirmButtonText?: string;
    confirm?: () => void;
}

const info = (props: AlertProps) => {
    return(
        <Toast bg="light" delay={3000} autohide>
            <Toast.Header>
                <strong className="mr-auto">{props.title ? props.title : "Info"}</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

const success = (props: AlertProps) => {
    return(
        <Toast bg="success">
            <Toast.Header>
                <strong className="mr-auto">{props.title ? props.title : "Sucesso"}</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

const warning = (props: AlertProps) => {
    return(
        <Toast bg="warning">
            <Toast.Header>
                <strong className="mr-auto">{props.title ? props.title : "Atenção"}</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

const error = (props: AlertProps) => {
    return(
        <Toast bg="danger">
            <Toast.Header>
                <strong className="mr-auto">{props.title ? props.title : "Erro"}</strong>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

export const Alert = { info, success, warning, error };