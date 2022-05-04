import "./App.css";
import Booking from "./Components/User/hotelBooking"
import MyBooking from "./Components/User/myBooking";
import SignUp from "./Components/Auth/signup";
import Login from "./Components/Auth/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
      <Router>
          <div>
          <Routes>
                  <Route exact path="/signup" element={<SignUp/>}/>
              </Routes>
              <Routes>
                  <Route exact path="/login" element={<Login/>}/>
              </Routes>
              <Routes>
                  <Route exact path="/" element={<Booking/>}/>
              </Routes>
              <Routes>
                  <Route exact path="/booking" element={<Booking/>}/>
              </Routes>
              <Routes>
                  <Route exact path="/mybooking" element={<MyBooking/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
