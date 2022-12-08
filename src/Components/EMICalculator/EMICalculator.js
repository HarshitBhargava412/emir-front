import React, { useEffect, useState } from 'react';
import "./EMICalculator.css";
import { auth, firestore } from "../../firebase/firbaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, addDoc, getDoc } from '@firebase/firestore';


function EMICalculator() {
    let [user, setUser] = useState("");
    let [downPayment, setDownPayment] = useState(1000);
    let [amount, setAmount] = useState([0, 0, 0, 0, 0, 0]);
    let [rate, setRate] = useState(0);
    let [emiAmount, setEmiAmount] = useState([0, 0, 0, 0, 0, 0]);
    let [schemes, setSchemes] = useState([]);
    let [monthArray, setMonthArray] = useState([]);
    
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         const uid = user.uid;
    //         setUser(uid);
    //     } else {
    //         window.location.href = "/login";
    //     }
    // });

    async function onload() {
        const schemes_raw = [];
        let querySnapshot = await getDoc(doc(firestore, "banks", "hdfc"));
        querySnapshot.data().schemes.forEach((element) => {
            schemes_raw.push([element.scheme, element.rate, element.tenure]);
        });

        setSchemes([...schemes_raw]);
    }

    let payment_raw = localStorage.getItem("payments");
    let payments = JSON.parse(payment_raw);


    let total = payments.on_road_price;

    async function rateSelect() {
        let rate_select = document.getElementById("rate-select").value;
        let rate_select_index = document.getElementById("rate-select").selectedIndex - 1;
        setRate(rate_select);
        let months = [6, 12, 18, 24, 30, 36, 42, 48];

        let tenure = schemes[rate_select_index][2].split("-");
        let displayMonths = months.filter((element) => {
            if(element>tenure[0] && element<tenure[1]) {
                return element;
            }
        })

        setMonthArray([...displayMonths]);
    }

    function sliderChange(event) {
        let value = event.target.value;
        let rate_raw = document.getElementById("rate-select").value;
        let time = monthArray;
        let emi_amounts = [];
        let final_amounts = [];
        
        if(rate_raw !== "") {
            let rate = parseFloat(rate_raw)/1200;
            setDownPayment(value);
        
            let leftAmount = total - value;

            time.forEach((element) => {
                let interest = (leftAmount*rate*Math.pow(1+rate, element))/(Math.pow(1+rate, element)-1);
                emi_amounts.push(interest.toFixed(2));
                let final_amount = (interest * element) + parseFloat(value);
                final_amounts.push(final_amount.toFixed(2))
            })
            
            setEmiAmount([...emi_amounts]);
            setAmount([...final_amounts]);
        } else {
            alert("First Select a Rate Percentage.");
            event.target.value = "1000";
        }
    }

    useEffect(() => {
        onload();
    }, []);

    return (
        <div className='emi-calculator-page-container'>
            <div className='emi-calculator-page-container-head'>
                EMI Calculator
            </div>
            <div className='emi-calculator-page-container-content'>
                <div className='emi-calculator-page-container-content-container'>
                    <div className='emi-calculator-page1-head'>
                        Select A Scheme
                    </div>
                    <select id='rate-select' onChange={rateSelect}>
                        <option value="">Select the Rate Percentage</option>
                        {schemes.map((element, index) => (
                            <option value={element[1]} key={index}>{element[0]} - {element[1]}%</option>
                        ))}
                    </select>
                    <div className='emi-calculator-page1-down-payment-head'>
                        DownPayment
                    </div>
                    <div className='emi-calculator-page1-down-payment-slider'>
                        <input type="range" min="1000" max={total} step="1000" onInput={event => sliderChange(event)} className="down_slider" />
                    </div>
                    <div className='emi-calculator-page1-down-payment'>
                        <div>
                            DownPayment Amount
                        </div>
                        <div>
                            &#8377; {downPayment}
                        </div>
                    </div>
                    <div className='emi-calculator-page1-rate-container'>
                        <div>
                            Rate of Interest
                        </div>
                        <div>
                            {rate} %
                        </div>
                    </div>
                    <div className='emi-calculator-page1-emi-container'>
                        <div className='emi-calculator-page1-emi-container-element-head'>
                            <div className='emi-calculator-page1-emi-container-element-inner'>
                                Months
                            </div>
                            <div className='emi-calculator-page1-emi-container-element-inner'>
                                EMI
                            </div>
                            <div className='emi-calculator-page1-emi-container-element-inner'>
                                Amount
                            </div>
                        </div>
                        {monthArray.map((element, index) => (
                            <div className='emi-calculator-page1-emi-container-element' key={index}>
                                <div className='emi-calculator-page1-emi-container-element-inner'>
                                    {element} Months
                                </div>
                                <div className='emi-calculator-page1-emi-container-element-inner'>
                                    &#8377; {emiAmount[index]}
                                </div>
                                <div className='emi-calculator-page1-emi-container-element-inner'>
                                    &#8377; {amount[index]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='emi-calculator-page-container-content-container'>
                    <div className="emi-calculator-page-container-content-container-inner-head">
                        Preview
                    </div>
                    <div className="emi-calculator-page-container-content-container-inner-container">
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                Make and Model
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                {payments.model_name}
                            </div>
                        </div>
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                Ex-Showroom Price
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                &#8377; {payments.ex_showroom_price}
                            </div>
                        </div>
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                Registration
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                &#8377; {payments.registration_price}
                            </div>
                        </div>
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                Insurance
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                &#8377; {payments.insurance}
                            </div>
                        </div>
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                Accessories
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                &#8377; {payments.accessories_price}
                            </div>
                        </div>
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                Discount
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                &#8377; {payments.discount}
                            </div>
                        </div>
                        <div className='emi-calculator-page-container-content-container-inner-content'>
                            <div className="emi-calculator-page-container-content-container-inner-content-part1">
                                On Road Price
                            </div>
                            <div className="emi-calculator-page-container-content-container-inner-content-part2">
                                &#8377; {payments.on_road_price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='emi-calculator-page-container-button'>
                <div className="emi-calculator-button">
                    EXPORT
                </div>
            </div>
        </div>
    )
}

export default EMICalculator