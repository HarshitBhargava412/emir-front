import React, { useEffect, useState } from 'react';
import "./QuotationPage.css";
import { auth } from "../../firebase/firbaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { json } from 'react-router-dom';

function QuotationPage() {
    let [user, setUser] = useState("");
    let [paymentDetails, setPaymentDetails] = useState({});

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(uid);
            // ...
        } else {
            window.location.href = "/login";
        }
    });

    function onLoad() {
        let model_name = "TVS Jupiter 125";
        let ex_showroom_price = 72000;
        let discount = 8000;
        let discount_percentage = Math.round((discount/ex_showroom_price)/100);
        let registration_price = Math.round(((ex_showroom_price*0.11)+(ex_showroom_price*0.11)*0.02)+550);
        let insurance = Math.round(((((ex_showroom_price*0.95)*0.01676)*((100-discount_percentage)/100))+3601)+(((((ex_showroom_price*0.95)*0.01676)*((100-discount_percentage)/100))+3601)*0.18));
        let accessories_price = 0;
        let on_road_price = ex_showroom_price + registration_price + insurance + accessories_price - discount;
        
        let payments = {
            "model_name": model_name,
            "ex_showroom_price": ex_showroom_price,
            "discount": discount,
            "registration_price": registration_price,
            "insurance": insurance,
            "accessories_price": accessories_price,
            "on_road_price": on_road_price
        }

        setPaymentDetails(payments);
        localStorage.setItem("payments", JSON.stringify(payments));
    }

    function proceed() {
        let user = auth.currentUser;
        
        if(user === null) {
            window.location.href = "/login"
        } else {
            window.location.href = "/bank";
        }
    }

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <div className='quotation-page-container'>
            <div className="quotation-page-container-head">
                Quotation
            </div>
            <div className='quotation-page-container-content'>
                <div className="quotation-page-container-content-part1">
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            Make and Model
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            {paymentDetails.model_name}
                        </div>
                    </div>
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            Ex-Showroom Price
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            &#8377; {paymentDetails.ex_showroom_price}
                        </div>
                    </div>
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            Registration
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            &#8377; {paymentDetails.registration_price}
                        </div>
                    </div>
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            Insurance
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            &#8377; {paymentDetails.insurance}
                        </div>
                    </div>
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            Accessories
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            &#8377; {paymentDetails.accessories_price}
                        </div>
                    </div>
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            Discount
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            &#8377; {paymentDetails.discount}
                        </div>
                    </div>
                    <div className='quotation-page-content-part1-element'>
                        <div className="quotation-page-content-part1-element-part1">
                            On Road Price
                        </div>
                        <div className="quotation-page-content-part1-element-part2">
                            &#8377; {paymentDetails.on_road_price}
                        </div>
                    </div>
                </div>
                <div className="quotation-page-container-content-part2">
                    <img src={require("../../images/variants/variant2.png")} alt="" width="500px" />
                </div>
            </div>
            <div className='quotation-page-container-button-container'>
                <div className="quotation-page-container-button-1">Cash</div>
                <span onClick={proceed} className="quotation-page-container-button-1">Loan</span>
            </div>
        </div>
    )
}

export default QuotationPage