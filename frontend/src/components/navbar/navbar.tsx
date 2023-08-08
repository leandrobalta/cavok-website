import "./navbar.css";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import CavokTextIcon from "components/icons/cavok-text";

export function NavBar() {
    return (
        <nav className="navbar">
            <div className="brand">
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
                <button className="menu-btn">
                    <MenuIcon size={25}/>
                </button>
            </div>
        </nav>
    );
}
