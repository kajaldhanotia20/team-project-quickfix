import "./App.css";
import Booking from "./Components/User/hotelBooking"
import MyBooking from "./Components/User/myBooking";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookings from "./Components/Hotel/Bookings";
import Dashboard from "./Components/Hotel/Dashboard";

function App() {
  return (
      <Router>
          <div>
              <Routes>
                  <Route exact path="/" element={<Booking/>}/>
              </Routes>
              <Routes>
                  <Route exact path="/booking" element={<Booking/>}/>
              </Routes>
              <Routes>
                  <Route exact path="/mybooking" element={<MyBooking/>}/>
              </Routes>
              <Routes>
                    <Route exact path="/dashboard" element={<Dashboard/>} />
                    <Route exact path="/bookings" element={<Bookings/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
