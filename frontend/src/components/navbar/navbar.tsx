import "./navbar.css";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";
import CavokTextIcon from "components/icons/cavok-text";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

export function NavBar() {
    const [showMenuBtn, setshowMenuBtn] = useState(false);

    const toggleDropdown = () => {
        setshowMenuBtn(!showMenuBtn);
    };

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
                <div className="dropdown">
                    <button className="menu-btn" onClick={(evt) => toggleDropdown()}>
                        <MenuIcon size={25} />
                    </button>
                    {
                        showMenuBtn && (
                            <div className="dropdown-content">
                                <a href="">Option 1</a>
                                <hr style={{ margin: "0" }}/>
                                <a href="">Option 2</a>
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}
