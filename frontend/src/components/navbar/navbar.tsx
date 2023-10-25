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
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);

    const handleUserOption = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (isLogged) {
            sessionStorage.removeItem("token");
            setIsLogged(false);
            alert("sorry but doesnt exists user page yet")
        }
        else{
            navigate("/login")
        }
    }

    useEffect(() => {
        sessionStorage.getItem("token") ? setIsLogged(true) : setIsLogged(false);
    }, [])

    return (
        <ul className="menu-list">
            <li>
                <a href="" className="text-bold" onClick={handleUserOption}>{isLogged ? `Ola, Usuario` : `Entre ou cadastre-se`}</a>
            </li>
            <Divider />
            <li>
                <a href="">Meus Pedidos</a>
            </li>
            <Divider />
            <li>
                <a href="../politics">Cancelamento/Reembolso</a>
            </li>
            <Divider />
            <li>
                <a href="../terms">Termos e Condições</a>
            </li>
            <Divider />
            <li>
                <a href="../privacy">Política de Privacidade</a>
            </li>
            {/* <Divider />
            <li>
                <a href="../doubts">Dúvidas Frequentes</a>
            </li> */}
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
    const { height, width } = useWindowDimensions();

    //states
    const [showMenu, setshowMenu] = useState(false);

    const handleOutsideClick = () => {
        //console.log("handleOutsideClick");
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
                                <a href="/about"> Quem somos </a>
                            </li>
                            <li>
                                {" "}
                                <a href="https://api.whatsapp.com/send?phone=5512997578780&text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20cota%C3%A7%C3%A3o."> Fale Conosco </a>
                            </li>
                        </ul>
                    </div>
                    <div className="menu" ref={width > 768 ? wrapperRef : undefined}>
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
