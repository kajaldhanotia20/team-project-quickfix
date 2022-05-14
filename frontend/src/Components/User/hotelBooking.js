import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../logo.png'
import '../../App.css'
import { Container } from '@material-ui/core'

export default function LandingPage() {

   
    return (

       
        <header style={ HeaderStyle }>
           
           <div classname="logo"><center><img src={Logo} alt="Logo"/> </center> 
            <p className="sub-title">One-stop hotel booking platform</p>
           
           
            <div className="sub-title">

                <Link to="/login">
                    <button size="sm" className="primary-button"><span>log in</span></button>
                </Link>
                <Link to="/signup">
                    <button className="primary-button" id="reg_btn"><span>register </span></button>
                </Link>
            </div>
            </div>
        </header>
        
    )
}


const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(https://images.pexels.com/photos/2029663/pexels-photo-2029663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
    //backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}