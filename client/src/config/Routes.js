import { Route, Routes } from 'react-router-dom';

import Home from '~/components/pages/Home';
import Catalog from '~/components/pages/Catalog';
import Detail from '~/components/pages/Detail';

const CustomRoutes = () => {
   return (
      <Routes>
         <Route path="/:category/search/:keyword" element={<Catalog />}></Route>
         <Route path="/:category/:id" element={<Detail />}></Route>
         <Route path="/:category" element={<Catalog />}></Route>
         <Route path="/" element={<Home />}></Route>
      </Routes>
   );
};

export default CustomRoutes;
