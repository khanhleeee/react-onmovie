import FooterOnly from '~/components/Layouts/FooterOnly/FooterOnly';
import AdminLayout from '~/components/Layouts/AdminLayout/AdminLayout';

import Home from '~/components/pages/Home';
import User from '~/components/pages/user/User';
import Admin from '~/components/pages/admin/ManageFilms';
import Catalog from '~/components/pages/Catalog';
import LogIn from '~/components/pages/authentic/LogIn';
import Detail from '~/components/pages/detail/Detail';
import Search from '~/components/pages/Search';
import SignUp from '~/components/pages/authentic/SignUp';

// Public routes
const publicRoutes = [
   { path: '/', component: Home },
   { path: '/user', component: User, headerActive: true },
   { path: '/admin', component: Admin, layout: AdminLayout },
   { path: '/movie', component: Catalog },
   { path: '/login', component: LogIn, layout: FooterOnly },
   { path: '/signup', component: SignUp, layout: FooterOnly },
   { path: '/movie/:id', component: Detail },
   { path: '/movie/search/:keyword', component: Search },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
