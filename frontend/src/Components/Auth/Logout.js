import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = async() => {
    sessionStorage.clear();

return(
    <div>
        You are Logged out!
    </div>
);
}

export default Logout;