import React from 'react';
import './MenuBar.css';
import { auth } from "../../firebase/firbaseConfig";
import { signOut } from 'firebase/auth';

function MenuBar() {
    function menu_bar_close() {
        document.querySelector(".menu-bar-container").style.display = "none";
    }

    function homeButton() {
        window.location.href = "/";
    }

    function profileButton() {
        let user = auth.currentUser;
        if(user === null) {
            window.location.href = "/login"
        } else {
            window.location.href = "/profile";
        }
    }

    function customersButton() {
        window.location.href = "/customers";
    }

    function logoutButton() {
        signOut(auth);
        window.location.href = "/";
    }

    return (
        <div className='menu-bar-container'>
            <div className='menu-bar-header' onClick={menu_bar_close}>
                <img src={require("../../images/menu-bar/menu-bar-close.png")} alt="close-logo" />
            </div>
            <div className='menu-bar-contents'>
                <div className='home-menu' onClick={homeButton}>
                    <img src={require("../../images/menu-bar/home-button.png")} alt="" />
                    <span>Home</span>
                </div>
                <div className='profile-menu' onClick={profileButton}>
                    <img src={require("../../images/menu-bar/profile-button.png")} alt="" />
                    <span>Profile</span>
                </div>
                <div className='customer-menu' onClick={customersButton}>
                    <img src={require("../../images/menu-bar/profile-button.png")} alt="" />
                    <span>Customers</span>
                </div>
                <div className='logout-menu' onClick={logoutButton}>
                    <img src={require("../../images/menu-bar/logout-button.png")} alt="" />
                    <span>Log Out</span>
                </div>
            </div>
        </div>
    )
}

export default MenuBar