import React, { useState } from 'react';
import "./ModelPage.css";
import { auth } from "../../firebase/firbaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { CButton } from '@coreui/bootstrap-react';

function ModelPage() {

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
            window.location.href = "/variants";
        }
    }
    
    let models_array = ["model1.png", "model2.png", "model3.png", "model4.png", "model5.png"];
    
    return (
        <div className='models-page-container'>
            <div className='models-page-icon-container'>
                {models_array.map((element, index) => (
                    <span onClick={proceed} key={index}>
                        <img src={require("../../images/models/"+element)} alt="logo" />
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ModelPage