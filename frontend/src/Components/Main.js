import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookings from "./Hotel/Bookings";
import Dashboard from "./Hotel/Dashboard";

class Main extends Component{
    render(){
        return (
            <div>
                <Router>
                <Routes>
                    <Route exact path="/dashboard" element={<Dashboard/>} />
                    <Route exact path="/bookings" element={<Bookings/>}/>
                </Routes>
                </Router>
            </div>
        )
    }
    
}

export default Main;
