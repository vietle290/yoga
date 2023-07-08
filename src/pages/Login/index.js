import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginButton = document.getElementById('loginButton');
        loginButton.disabled = true;

        try {
            const response = await axios.get('https://6492a604428c3d2035d06ce7.mockapi.io/lab10/api/logins', {
                params: {
                    username,
                    password,
                },
            });

            const tokens = response.data;
            const token = JSON.stringify(tokens);

            // Extract the roles from the response data
            const roles = tokens.map((token) => token.roles);

            if (token && roles) {
                localStorage.setItem('token', token);
                localStorage.setItem('userRoles', JSON.stringify(roles));
                console.log('userroles:' + JSON.stringify(roles)); // Store roles as a JSON string
                if (roles.includes('admin')) {
                    navigate(config.routes.admin);
                } else if (roles.includes('staff')) {
                    navigate(config.routes.staff);
                } else if (roles.includes('member')) {
                    navigate(config.routes.member);
                } else {
                    console.log('No valid role found');
                }
            } else {
                console.log('Token or Roles not found');
            }
        } catch (error) {
            console.log('Error:', error);
        } finally {
            loginButton.disabled = false;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button id="loginButton" type="submit">
                    Login
                </button>
            </form>
            <a href='/register'>Register new account</a>
        </div>
    );
}

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import config from "../../config";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       // Make a request to your Swagger API for authentication
//       const response = await axios.get("https://6492a604428c3d2035d06ce7.mockapi.io/lab10/api/logins", {
//         username,
//         password,
//       });

//       // Store the token in localStorage
//       const tokens = response.data;
//       const token = JSON.stringify(tokens);
//       localStorage.setItem("token", token);

//       const role = response.data.roles;
//       const roles = JSON.stringify(role);
//       localStorage.setItem("userRoles", roles);
//       // Redirect to the home page
//       window.location.href = config.routes.home;
//     } catch (error) {
//       console.error("Login failed:", error);
//       // Handle login error
//     }
//   };

//   return (
//     <div>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
