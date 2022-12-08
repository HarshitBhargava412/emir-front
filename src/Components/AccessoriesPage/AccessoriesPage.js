import React, { useState } from 'react';
import "./AccessoriesPage.css";
import { firestore, auth } from "../../firebase/firbaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, addDoc, getDoc } from '@firebase/firestore';

function AccessoriesPage() {
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
            window.location.href = "/quotation";
        }
    }

    let helmets_array = [["image1.png", 2000], ["image2.png", 1000], ["image3.png", 899], ["image4.png", 2000], ["image5.png", 899]];
    let body_covers_array = [["image1.png", 1000], ["image2.png", 800], ["image3.png", 1000], ["image4.png", 2000]];

    function selectVariant(event) {
        if(event.target.parentNode.parentNode.classList.contains("active")) {
            event.target.parentNode.parentNode.classList.remove("active");
        } else {
            event.target.parentNode.parentNode.classList.add("active");
        }
    }

    return (
        <div className='accessories-page-container'>
            <div className='accessories-page-container-head'>
                Accessories
            </div>
            <div className='accessories-page-container-content'>
                <div className='accessories-page-container-content-head'>
                    Helmets
                </div>
                <div className='accessories-page-container-content-container'>
                    {helmets_array.map((element, index) => (
                        <div className='accessories-page-container-content-container-inner' key={index}>
                            <div className='accessories-page-container-content-container-inner-image' onClick={event => selectVariant(event)}>
                                <img src={require("../../images/accessories/helmets/"+element[0])} alt="" />
                            </div>
                            <div className='accessories-page-container-content-container-inner-price'>
                                &#8377; {element[1]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='accessories-page-container-content'>
                <div className='accessories-page-container-content-head'>
                    Body Covers
                </div>
                <div className='accessories-page-container-content-container'>
                    {body_covers_array.map((element1, index) => (
                        <div className='accessories-page-container-content-container-inner' key={index}>
                            <div className='accessories-page-container-content-container-inner-image' onClick={event => selectVariant(event)}>
                                <img src={require("../../images/accessories/body-covers/"+element1[0])} alt="" />
                            </div>
                            <div className='accessories-page-container-content-container-inner-price'>
                                &#8377; {element1[1]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='accessories-page-button'>
                <span onClick={proceed}>Continue</span>
            </div>
        </div>
    )
}

export default AccessoriesPage