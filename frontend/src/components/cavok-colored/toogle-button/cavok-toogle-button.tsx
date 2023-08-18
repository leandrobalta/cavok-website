import React, { useEffect } from "react";
import { ToggleButton, ToggleButtonProps } from "react-bootstrap";
import "./cavok-toggle-button.css";

export const CavokToggleButton: React.FC<ToggleButtonProps> = ({...props}) => {
    return (
        <ToggleButton
            className={props.checked ? "btn-active" : "btn-inactive"}
            style={{ minWidth: "10rem" }}
            {...props}
        >
            {props.children}
        </ToggleButton>
    );
};
