import React from "react";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="heading">
            <Link to="/">
            <img src={logo}  alt="" />
            </Link>
        </header>
    );
};

export default Header;