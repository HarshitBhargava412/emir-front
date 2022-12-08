import React, { useEffect, useState } from 'react';
import "./VariantsPage.css";
import { auth } from "../../firebase/firbaseConfig";
import { onAuthStateChanged } from 'firebase/auth';

function VariantsPage() {
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
            window.location.href = "/accessories";
        }
    }

    let variants_array = ["Disc", "Drum", "Drum Alloy"];
    let colors_array = ["variant1.png", "variant2.png", "variant3.png", "variant4.png"];

    useEffect(() => {
    }, [])

    return (
        <div className='variants-page-container'>
            <div className="variants-page-container-head">
                TVS Jupiter 125
            </div>
            <div className='variants-page-lower-container'>
                <div className="variant-page-lower-inner-1">
                    <div className="variant-page-lower-inner-1-head">
                        Variants
                    </div>
                    {variants_array.map((element) => (
                        <div className='variant-container' key={element}>
                            <div className='variant-container-head'>
                                {element}
                            </div>
                            <div className='variants-container-content'>
                                {colors_array.map((element1, index) => (
                                    <div className='variants-container-content-container' key={index}>
                                        <div className='variants-container-image'>
                                            <span onClick={proceed}>
                                                <img src={require("../../images/variants/"+element1)} alt="variant" />
                                            </span>
                                        </div>
                                        <div className='variants-container-image-price'>
                                            &#8377; 72000
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="variant-page-lower-inner-2">
                    <div className='variant-page-lower-inner-2-upper'>
                        <div className="variant-page-lower-inner-2-upper-head">
                            Specifications
                        </div>
                        <div className="variant-page-lower-inner-2-upper-content">
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Mileage
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    52.27 km/l
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Displacement
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    124.8 cc
                                </div>
                            </div>
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Engine Type
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Single Cylinder, 4 Stroke, Air Cooled
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    No. of Cylinders
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    1
                                </div>
                            </div>
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Max Power
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    8.15 PS @ 6500 rpm
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Max Torque
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    10.5 Nm @ 4500 rpm
                                </div>
                            </div>
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Front Brake
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Disc
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Fuel Capacity
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    5.1 L
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='variant-page-lower-inner-2-lower'>
                        <div className="variant-page-lower-inner-2-lower-head">
                            Features
                        </div>
                        <div className="variant-page-lower-inner-2-lower-content">
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Braking Type
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Synchronized Braking System
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Trip Meter
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Digital
                                </div>
                            </div>
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Boot Light
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Yes
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Odometer
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Digital
                                </div>
                            </div>
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Speedometer
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Analogue
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Fuel Gauge
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Yes
                                </div>
                            </div>
                            <div className='variant-inner-2-content-part'>
                                <div className='variant-inner-2-content-part-inner'>
                                    Trip Meter
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Digital
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    External Fuel Filling
                                </div>
                                <div className='variant-inner-2-content-part-inner'>
                                    Yes
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VariantsPage