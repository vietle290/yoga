import { useState } from 'react';
import { useEffect } from 'react';
import config from '../../config';

function Logout() {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        userRoles: JSON.parse(localStorage.getItem('userRoles')) || [],
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRoles = JSON.parse(localStorage.getItem('userRoles')) || [];

        setAuthState({ token, userRoles });
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        // Clear authentication information from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userRoles');

        // Redirect to the login page
        window.location.href = config.routes.login;
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
