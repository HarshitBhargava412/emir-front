import React, { useState } from 'react';
import "./Bank.css";
import { auth } from "../../firebase/firbaseConfig";
import { onAuthStateChanged } from 'firebase/auth';

function Bank() {
    let [user, setUser] = useState("");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(uid);
            // ...
        } else {
            window.location.href = "/login";
        }
    });

    function proceed() {
        let user = auth.currentUser;
        
        if(user === null) {
            window.location.href = "/login"
        } else {
            window.location.href = "/emi";
        }
    }

    let bank_array = ["image.png", "image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png", "image10.png", "image11.png", "image12.png", "image13.png"];

    return (
        <div className='bank-page-container'>
            <div className='bank-page-container-head'>
                Choose Your Bank
            </div>
            <div className='bank-page-icon-container'>
                {bank_array.map((element) => (
                    <span onClick={proceed}>
                        <img src={require("../../images/banks/"+element)} alt="logo" />
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Bank