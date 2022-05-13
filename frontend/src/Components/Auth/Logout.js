import * as React from 'react';

const Logout = () => {
    sessionStorage.clear();
return(
    <div>
        You are Logged out!
    </div>
);
}

export default Logout;