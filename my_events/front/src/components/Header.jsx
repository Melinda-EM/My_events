import React from "react";
import { Link } from "react-router-dom";
import account from "../assets/avatar.png"
import logo from "../assets/logo.png"
import '../index.css';
import Login from "./Login"

const Header = ({user, setUser}) => {
    return (
        <div id="navbar">
            <div className="image">
                <Link to="/">
                    <img src={logo} alt="logo du site" className="logo"/>
                </Link>
                <Link to="/account">
                    <img  src={account} alt="avatar de connexion" className="account" />
                </Link>
            </div>
        </div>
    );
}

export default Header;