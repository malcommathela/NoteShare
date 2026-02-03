import {Link} from "react-router-dom";
import "../css/Navbar.css"
import React from "react";
import {useAuth} from "../Context/AuthContext.jsx";



function NavBar(){

    const { logout } = useAuth();

    return <nav className="navbar">
        <div className="navbar-brand">
            <div className="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="6" fill="#635BFF"/>
                    <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white"/>
                </svg>
            </div>
            <Link to="/">NoteShare</Link>
        </div>
        <div className="navbar-links">
            <Link className="nav-link" to="" >Home</Link>
            <Link className="nav-link"  to="">Favorites</Link>
            <Link className="nav-link"  to="">Contact</Link>
            <Link className="nav-link"  to="">About</Link>
            <button className="secondary" onClick={logout}>
                Logout
            </button>

        </div>
    </nav>
}

export default NavBar;