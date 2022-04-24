import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Hotel/Dashboard";

class Main extends Component{
    render(){
        return (
            <div>
                <Router>
                <Routes>
                    <Route exact path="/search" element={<Dashboard/>} />
                </Routes>
                </Router>
            </div>
        )
    }
    
}

export default Main;
