// import config from '../config';

// // Layouts
// import { HeaderOnly } from '../components/Layout';

// // Pages
// import Staff from '../pages/Staff';
// import Admin from '../pages/Admin';
// import Member from '../pages/Member';

// // Public routes
// const publicRoutes = [
//     { path: config.routes.admin, component: Admin },
//     { path: config.routes.staff, component: Staff },
//     // { path: config.routes.upload, component: Upload, layout: HeaderOnly },
//     { path: config.routes.member, component: Member, layout: null },
// ];

// const privateRoutes = [];

// export { publicRoutes, privateRoutes };

import config from '../config';
import { HeaderOnly } from '../components/Layout';
import Staff from '../pages/Staff';
import Admin from '../pages/Admin';
import Member from '../pages/Member';
import Login from '../pages/Login';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: HeaderOnly , roles: []},
    { path: config.routes.admin, component: Admin, roles: ['admin'] },
    { path: config.routes.staff, component: Staff, roles: ['staff'] },
    { path: config.routes.member, component: Member, layout: null, roles: ['member'] },
    { path: config.routes.home, component: Login, roles: []},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
