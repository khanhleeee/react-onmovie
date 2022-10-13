import { Route, Routes } from 'react-router-dom';

import Home from '~/components/pages/Home';
import Catalog from '~/components/pages/Catalog';
import Detail from '~/components/pages/detail/Detail';
import Search from '~/components/pages/Search';

const CustomRoutes = () => {
   return (
      <Routes>
         <Route path="/:category/search/:keyword" element={<Search />}></Route>
         <Route path="/:category/:id" element={<Detail />}></Route>
         <Route path="/:category" element={<Catalog />}></Route>
         <Route path="/" element={<Home />}></Route>
      </Routes>
   );
};

export default CustomRoutes;
