import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginButton = document.getElementById('loginButton');
        loginButton.disabled = true;

        try {
            const response = await axios.post('https://6492a604428c3d2035d06ce7.mockapi.io/lab10/api/logins', {
                username,
                password,
                roles: 'member',
            });
        } catch (error) {
            console.log('Error:', error);
        }
        navigate(config.routes.login);
    };

    return (
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
                Sign up
            </button>
        </form>
    );
}

export default Register;
