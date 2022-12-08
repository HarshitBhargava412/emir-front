import React from 'react';
import { firestore, auth } from "../../firebase/firbaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, getDoc } from '@firebase/firestore';
import './Login.css';
// import  secureLocalStorage  from  "react-secure-storage";

function Login() {

    console.log(auth.currentUser);

    if(auth.currentUser !== null) {
        window.location.href = "/";
    }

    function getRecaptchaVerifier() {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                onSignInSubmit();
                console.log("Captcha Resolved");
            }, defaultCountry: "IN"
        }, auth);
    }

    function onSignInSubmit(event) {
        event.preventDefault();
        getRecaptchaVerifier();
        const phoneNumber = "+91"+document.querySelector(".phone_number").value;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log("SMS Sent");
                document.querySelector(".otp").style.display = "block";
                document.querySelector(".send-button").style.display = "none";
                document.querySelector(".verify-button").style.display = "block";
            // ...
            }).catch((error) => {
                console.log(error);
                console.log("not Sent");
                window.recaptchaVerifier.render().then(function(widgetId) {
                    getRecaptchaVerifier.reset(widgetId);
                });
            });
    }

    function onOTPInput(event) {
        event.preventDefault();
        let otp_input = document.querySelector(".otp").value;
        console.log(otp_input);

        window.confirmationResult.confirm(otp_input).then(async(result) => {
            // User signed in successfully.
            const user = result.user;

            let querySnapshot = await getDoc(doc(firestore, "company/", user.uid));

            if(querySnapshot.data() !== undefined && querySnapshot.data().name !== undefined) {
                window.location.href = "/";
            } else {
                await setDoc(doc(firestore, "company/", user.uid), {
                    "company_id": user.uid,
                    "mobile": "+91"+document.querySelector(".phone_number").value
                });
                window.location.href = "/signup";
                console.log(user.uid);
            }
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log("Not Created");
            console.log(error);
        });
    }

    return (
        <div className='login-body'>
            <div className="login">
                <h1>Login</h1>
                <form>
                    <div id="recaptcha-container"></div>
                    <input type="tel" className='phone_number' placeholder="Enter Phone Number" minLength={10} maxLength={10} autoFocus required />
                    <input type="number" className='otp' placeholder="Enter The OTP" />
                    <button onClick={event => onSignInSubmit(event)} type="submit" className="btn btn-primary btn-block btn-large email-button send-button">Send Code</button>
                    <button onClick={onOTPInput} type="submit" className="btn btn-primary btn-block btn-large email-button verify-button">Verify Code</button>
                </form>
            </div>
        </div>
    )
}

export default Login