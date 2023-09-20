import "./navbar.css";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import CavokTextIcon from "components/icons/cavok-text";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "hooks/window-dimensions";
import { useNavigate } from "react-router-dom";
import { useOutsideClickAlerter } from "hooks/outside-click-alerter";
import { Drawer } from "@mui/material";

type MenuContentProps = {
    show: boolean;
    setShow: (show: boolean) => void;
};

const Divider = () => (
    <hr
        style={{
            margin: "0",
        }}
    />
);

const MenuList = () => {
    return (
        <ul className="menu-list">
            <li>
                <a href="">Meu perfil</a>
            </li>
            <Divider />
            <li>
                <a href="">Meus Pedidos</a>
            </li>
            <Divider />
            <li>
                <a href="">Cancelamento/Reembolso</a>
            </li>
            <Divider />
            <li>
                <a href="">Termos e Condições</a>
            </li>
            <Divider />
            <li>
                <a href="">Central de Ajuda</a>
            </li>
            <Divider />
            <li>
                <a href="">Política de Privacidade</a>
            </li>
            <Divider />
            <li>
                <a href="">Dúvidas Frequentes</a>
            </li>
        </ul>
    );
};

const MenuContent = (props: MenuContentProps) => {
    const { height, width } = useWindowDimensions();

    return (
        <>
            {width > 812 ? (
                <div className="menu-content">
                    <MenuList />
                </div>
            ) : (
                // <Offcanvas
                //     show={props.show}
                //     onHide={() => props.setShow(false)}
                //     placement="end"
                //     style={{ maxWidth: "70%" }}
                // >
                //     <Offcanvas.Header closeButton>
                //         <Offcanvas.Title>Menu</Offcanvas.Title>
                //     </Offcanvas.Header>
                //     <Offcanvas.Body>
                //         <MenuList />
                //     </Offcanvas.Body>
                // </Offcanvas>

                <Drawer open={props.show} onClose={() => props.setShow(false)} anchor="right">
                    <MenuList />
                </Drawer>
            )}
        </>
    );
};

export function NavBar() {
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    //states
    const [showMenu, setshowMenu] = useState(false);

    const handleOutsideClick = () => {
        console.log("handleOutsideClick");
        setshowMenu(false);
    };

    const toggleDropdown = () => {
        setshowMenu(!showMenu);
    };

    const onHideMenuContent = (show: boolean) => {
        setshowMenu(show);
    };

    useOutsideClickAlerter(wrapperRef, handleOutsideClick);

    return (
        <nav className="navbar">
            <div className="navbar-conteiner">
                <div className="brand" onClick={(evt) => navigate("/")}>
                    <CavokTextIcon id="cavok-text-icon" />
                </div>
                <div className="options">
                    <div className="links">
                        <ul>
                            <li>
                                {" "}
                                <a href="#"> Quem somos </a>
                            </li>
                            <li>
                                {" "}
                                <a href="#"> Fale Conosco </a>
                            </li>
                        </ul>
                    </div>
                    <div className="menu" >
                        <button className="menu-btn" onClick={(evt) => toggleDropdown()}>
                            <MenuIcon size={25} />
                            <span>Menu</span>
                        </button>
                        {showMenu && <MenuContent show={showMenu} setShow={onHideMenuContent} />}
                    </div>
                </div>
            </div>
        </nav>
    );
}
