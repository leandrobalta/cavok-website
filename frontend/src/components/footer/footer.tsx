import { useEffect } from "react";
import "./footer.css";

export function Footer() {
    return (
        <>
            {window.location.pathname === "/signin" || window.location.pathname === "/login" ? null : (
                <footer>
                    <b>© Copyright {new Date().getFullYear()} Cavok Viagens</b>
                </footer>
            )}
        </>
    );
}
