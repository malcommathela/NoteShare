import {Link} from "react-router-dom";
import "../css/Navbar.css"
import React from "react";

function NavBar() {
    return (<header>
        <nav>
            <div className="menu-icon">
                <i className="fa fa-bars fa-2x"></i>
            </div>
            <div className="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="6" fill="#635BFF"/>
                    <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white"/>
                </svg>
                <h3>Note Share</h3>
            </div>
            <div className="menu">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
    );
}

export default NavBar;