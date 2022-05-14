import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = async() => {
    const history= useNavigate();
    sessionStorage.clear();
    history("/")
    


return(
    <div>
        You are Logged out!
    </div>
);
}

export default Logout;