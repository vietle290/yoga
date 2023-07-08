// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useAuth = (roles) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://your-api-url-here', {
//           headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token'),
//           },
//         });
//         const userRoles = response.data.roles;
//         setIsAuthenticated(userRoles.some((role) => roles.includes(role)));
//       } catch (error) {
//         setIsAuthenticated(false);
//       }
//     };
//     fetchData();
//   }, [roles]);

//   return isAuthenticated;
// };

// export default useAuth;

import { useState, useEffect } from 'react';
import axios from 'axios';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(localStorage.getItem('token'));
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios
            .get('https://6492a604428c3d2035d06ce7.mockapi.io/lab10/api/login', config)
            .then((response) => {
                const roles = response.data.roles;
                setIsAuthenticated(true);
                console.log(roles);
            })
            .catch((error) => {
                setIsAuthenticated(false);
            });
    }, []);

    return isAuthenticated;
}

export default useAuth;
