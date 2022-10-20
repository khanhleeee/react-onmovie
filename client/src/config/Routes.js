import { Route, Routes } from 'react-router-dom';

import Home from '~/components/pages/Home';
import Catalog from '~/components/pages/Catalog';
import LogIn from '~/components/pages/authentic/LogIn';
import Detail from '~/components/pages/detail/Detail';
import Search from '~/components/pages/Search';
import DefaultLayout from '~/components/Layouts/DefaultLayout/DefaultLayout';

const CustomRoutes = ({ path, element }) => {
   const Element = element;

   return <Route path={path} element={<Element />}></Route>;
};

export default CustomRoutes;
