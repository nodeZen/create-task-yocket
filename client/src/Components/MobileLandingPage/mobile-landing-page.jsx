import React from "react";
import sadIcon from "../../assets/sad-icn.png";
import "./mobile-landing-page.scss";

const MobileLandingPage = ()=>{
    return <div className="text-center">
        <img className="my-3" src={sadIcon} alt="Sad Icon"/>
        <h1 className="my-3 mobile-message">Sorry. The following App Can't be accessed via Small Screen Devices. Please use either a desktop or a Laptop to open the application</h1>
    </div>
};

export default MobileLandingPage;