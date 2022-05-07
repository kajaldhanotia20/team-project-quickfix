import HoteCards from "./HotelCards";
import * as React from 'react';
import Profile from "./Profile";

const Dashboard = () => {
    console.log(sessionStorage.getItem("usertype"));
return(
    <div>
        {sessionStorage.getItem("usertype")==="Customer" &&
        <HoteCards/>}
        {sessionStorage.getItem("usertype")==="Hotel"&&
        <Profile/>
        }
    </div>
);
}

export default Dashboard;