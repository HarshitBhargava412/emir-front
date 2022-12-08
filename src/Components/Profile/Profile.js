import React, { useEffect, useState } from 'react';
import "./Profile.css";
import { firestore, auth } from "../../firebase/firbaseConfig";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

function Profile() {

    let [infoObject, setInfoObject] = useState({});
    let [userid, setUser] = useState("");

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // setUser(uid);
            onLoad(uid);
            // ...
        } else {
            window.location.href = "/login";
        }
    });

    async function onLoad(userId) {
        let querySnapshot = await getDoc(doc(firestore, "company/", userId));

        let informationObject = {
            "name": querySnapshot.data().name,
            "email": querySnapshot.data().email,
            "district": querySnapshot.data().district,
            "state": querySnapshot.data().state,
            "pincode": querySnapshot.data().PinCode
        }

        setInfoObject(informationObject);
    }

    function editAccess() {
        document.querySelector(".edit-button").style.display = "none";
        document.querySelector(".submit-button").style.display = "block";
        document.querySelector(".name").removeAttribute("disabled");
        document.querySelector(".email").removeAttribute("disabled");
        document.querySelector(".district").removeAttribute("disabled");
        document.querySelector(".state").removeAttribute("disabled");
        document.querySelector(".pincode").removeAttribute("disabled");
    }
    
    async function onEditSubmit(event) {
        event.preventDefault();
        let user = auth.currentUser;

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

        document.querySelector(".submit-button").style.display = "none";
        document.querySelector(".edit-button").style.display = "block";
    }

    function signOutUser() {
        signOut(auth);
        window.location.href = "/";
    }

    // useEffect(() => {
    //     onLoad();
    // }, []);

    return (
        <div className='login-body'>
            <div className="login">
                <h1>Sign Up</h1>
                <form onSubmit={event => onEditSubmit(event)}>
                    <input type="text" className='name' placeholder="Enter Name" defaultValue={infoObject.name} required disabled/>
                    <input type="email" className='email' placeholder="Enter Your Email" defaultValue={infoObject.email} required disabled/>
                    <input type="text" className='district' placeholder="Enter Your District" defaultValue={infoObject.district} required disabled/>
                    <input type="text" className='state' placeholder="Enter Your State" defaultValue={infoObject.state} required disabled/>
                    <input type="number" className='pincode' placeholder="Enter Your PinCode" minLength={6} maxLength={6} defaultValue={infoObject.pincode} required disabled/>
                    <div onClick={editAccess} type="submit" className="btn btn-primary btn-block btn-large email-button edit-button">Edit</div>
                    <button type="submit" className="btn btn-primary btn-block btn-large email-button submit-button">Submit</button>
                    <div onClick={signOutUser} className="btn btn-primary btn-block btn-large email-button sign-out-button">Sign Out</div>
                </form>
            </div>
        </div>
    )
}

export default Profile