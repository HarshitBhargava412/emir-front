import React from "react";
import './CustomerModal.css';
import { firestore, auth } from "../../firebase/firbaseConfig";
import { collection, doc, addDoc, getDoc } from '@firebase/firestore';

function CustomerModal() {

    const handleSave = async(event) => {
        event.preventDefault();
        let user = auth.currentUser;
        let uid = user.uid;
        let name = document.querySelector(".customer_name").value
        let phone = document.querySelector(".customer_number").value
        let phoneNumber = "";
    
        if(phone !== "" && phone !== " ") {
            phoneNumber = "+91"+phone;
        } else {
            phoneNumber = "";
        }
        
        if(name !== "" && name !== " ") {
            await addDoc(collection(firestore, "company/"+uid+"/customer"), {
                "name": name,
                "mobile": phoneNumber,
                "comment": document.querySelector(".customer_comment").value
            });
            document.querySelector(".customer_name").value = "";
            document.querySelector(".customer_number").value = "";
            document.querySelector(".customer_comment").value = "";
            document.querySelector(".modal-container").style.display = "none";
        }
    }

    const handleClose = (event) => {
        event.preventDefault();
        document.querySelector(".modal-container").style.display = "none";
    }

    return ( 
        <div className="modal-container">
            <div className="login modal">
                <h1>Sign Up</h1>
                <form>
                    <input type="text" className='customer_name' placeholder="Enter Name" autoFocus />
                    <input type="number" className='customer_number' placeholder="Enter Your Phone Number" minLength={10} maxLength={10} />
                    <textarea type="text" className='customer_comment' placeholder="Enter Your State" />
                    <button className="btn btn-primary btn-block btn-large email-button send-button" onClick={handleSave}>Submit</button>
                    <button className="btn btn-secondary btn-block btn-large email-button close-button" onClick={handleClose}>Close</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerModal