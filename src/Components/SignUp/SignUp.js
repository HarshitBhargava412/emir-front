import React, { useState } from 'react';
import { firestore, auth } from "../../firebase/firbaseConfig";
import { doc, updateDoc } from '@firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function SignUp() {
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

    async function onSignUpSubmit(event) {
        event.preventDefault();
        let user = auth.currentUser;
        console.log(user);

        let name = document.querySelector(".name").value;
        let email = document.querySelector(".email").value;
        let district = document.querySelector(".district").value;
        let state = document.querySelector(".state").value;
        let pincode = document.querySelector(".pincode").value;

        await updateDoc(doc(firestore, "company/", user.uid), {
            "name": name,
            "email": email,
            "district": district,
            "state": state,
            "PinCode": pincode
        });

        window.location.href = "/";
    }

    return (        
        <div className='login-body'>
            <div className="login">
                <h1>Sign Up</h1>
                <form onSubmit={event => onSignUpSubmit(event)}>
                    <input type="text" className='name' placeholder="Enter Name" autoFocus required />
                    <input type="email" className='email' placeholder="Enter Your Email" required />
                    <input type="text" className='district' placeholder="Enter Your District" required />
                    <input type="text" className='state' placeholder="Enter Your State" required />
                    <input type="number" className='pincode' placeholder="Enter Your PinCode" minLength={6} maxLength={6} required />
                    <button type="submit" className="btn btn-primary btn-block btn-large email-button send-button">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp