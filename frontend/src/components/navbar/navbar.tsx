import "./navbar.css";
import { AiOutlineMenu as MenuIcon } from "react-icons/ai";

export function NavBar() {
    return (
        <nav className="navbar">
            <div className="brand">
                <h2> Logo </h2>
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
