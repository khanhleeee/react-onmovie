import FooterOnly from '~/components/Layouts/FooterOnly/FooterOnly';

import Home from '~/components/pages/Home';
import Catalog from '~/components/pages/Catalog';
import LogIn from '~/components/pages/authentic/LogIn';
import Detail from '~/components/pages/detail/Detail';
import Search from '~/components/pages/Search';

// Public routes
const publicRoutes = [
   { path: '/', component: Home },
   { path: '/movie', component: Catalog },
   { path: '/login', component: LogIn, layout: FooterOnly },
   { path: '/movie/:id', component: Detail },
   { path: '/movie/search/:keyword', component: Search },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
