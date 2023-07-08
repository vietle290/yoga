// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from './routes';
// import { DefaultLayout } from './components/Layout';
// import { Fragment } from 'react';

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     {publicRoutes.map((route, index) => {
//                         const Page = route.component;

//                         let Layout = DefaultLayout;
//                         if (route.layout) {
//                             Layout = route.layout;
//                         } else if (route.layout === null) {
//                             Layout = Fragment;
//                         }

//                         return (
//                             <Route
//                                 key={index}
//                                 path={route.path}
//                                 element={
//                                     <Layout>
//                                         <Page />
//                                     </Layout>
//                                 }
//                             />
//                         );
//                     })}
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
// -------------------------------
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { publicRoutes } from './routes';
// import { DefaultLayout } from './components/Layout';
// import { Fragment } from 'react';
// import useAuth from './hook/useAuth';

// function App() {
//     const isAuthenticated = useAuth(); // Change isAuthenticated to authenticatedRoles

//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     {publicRoutes.map((route, index) => {
//                         const Page = route.component;
//                         let Layout = DefaultLayout;
//                         if (route.layout) {
//                             Layout = route.layout;
//                         } else if (route.layout === null) {
//                             Layout = Fragment;
//                         }
//                         return (
//                             <Route
//                                 key={index}
//                                 path={route.path}
//                                 element={
//                                     isAuthenticated !== null && (route.roles.length === 0 || route.roles.some(roles => isAuthenticated && isAuthenticated.includes(roles))) ? (
//                                         <Layout>
//                                             <Page />
//                                         </Layout>
//                                     ) : (
//                                         <Navigate to="/login" />
//                                     )
//                                 }
//                             />
//                         );
//                     })}
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import config from './config';
import { DefaultLayout, HeaderOnly } from './components/Layout';
import Staff from './pages/Staff';
import Admin from './pages/Admin';
import Member from './pages/Member';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
    const ProtectedRoute = ({ roles, layout, component }) => {
        const isAuthenticated = localStorage.getItem('token');
        const userRoles = JSON.parse(localStorage.getItem('userRoles')) || [];

        if (isAuthenticated && userRoles.some((role) => roles.includes(role))) {
            const Page = component;
            let Layout = layout || DefaultLayout;
            if (layout === null) {
                Layout = HeaderOnly;
            }
            return (
                <Layout>
                    <Page />
                </Layout>
            );
        } else {
            return <Navigate to={config.routes.login} />;
        }
    };
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
        <Router>
            <div className="App">
                <Routes>
                    <Route path={config.routes.login} element={<Login />} />
                    <Route
                        path={config.routes.admin}
                        element={<ProtectedRoute roles={['admin']} layout={DefaultLayout} component={Admin} />}
                    />
                    <Route
                        path={config.routes.staff}
                        element={<ProtectedRoute roles={['staff']} layout={DefaultLayout} component={Staff} />}
                    />
                    <Route
                        path={config.routes.member}
                        element={<ProtectedRoute roles={['member']} layout={null} component={Member} />}
                    />
                    <Route
                        path={config.routes.dashboard}
                        element={<ProtectedRoute roles={['admin']} layout={null} component={Dashboard} />}
                    />
                    <Route path={config.routes.register} element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
