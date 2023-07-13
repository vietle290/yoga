import config from '../config';
import { HeaderOnly } from '../components/Layout';
import Staff from '../pages/Class';
import Admin from '../pages/User';
import Member from '../pages/Course';
import Login from '../pages/Login';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: HeaderOnly, roles: [] },
    { path: config.routes.admin, component: Admin, roles: ['admin'] },
    { path: config.routes.staff, component: Staff, roles: ['staff'] },
    { path: config.routes.member, component: Member, layout: null, roles: ['member'] },
    { path: config.routes.home, component: Login, roles: [] },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
