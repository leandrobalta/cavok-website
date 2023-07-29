import React from 'react';
import "./header.css"
import CavokWorld from 'components/icons/cavok-world';
import CavokTextIcon from 'components/icons/cavok-text';

export function Header() {
    const logo = require("assets/cavok/cavoktext-whitebg-icon.png");
    return (
        <header>
            {/* <img src={logo} alt="Cavok Icon" id='icon'/> */}
            <CavokTextIcon id='cavok-text-icon'/>
            <nav className='navbar'>
                <ul className='nav-list'>
                    <li className='nav-item'><a href='/'>Home</a></li>
                    <li className='nav-item'><a href='/about'>About</a></li>
                    <li className='nav-item'><a href='/contact'>Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}