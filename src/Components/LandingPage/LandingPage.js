import React from 'react';
import "./LandingPage.css";
import { auth } from "../../firebase/firbaseConfig";

function LandingPage() {
    function proceed() {
        let user = auth.currentUser;
        
        if(user === null) {
            window.location.href = "/login"
        } else {
            window.location.href = "/model";
        }
    }

    let imageArray = ["image.png", "image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png", "image10.png", "image11.png", "image12.png", "image13.png", "image14.png", "image15.png", "image16.png", "image17.png", "image18.png", "image19.png", "image20.png", "image14.png", "image15.png", "image16.png", "image17.png", "image18.png", "image19.png", "image20.png"];
    
    return (
        <div className='landing-page-container'>
            <div className='landing-page-icon-container'>
                {imageArray.map((element, index) => (
                    <span onClick={proceed} key={index}>
                        <img src={require("../../images/company-logo/"+element)} height="100px" width="100px" alt="logo" />
                    </span>
                ))}
            </div>
        </div>
    )
}

export default LandingPage