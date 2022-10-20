import 'swiper/swiper.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { publicRoutes } from './routes';

import CustomRoutes from './config/Routes';
import DefaultLayout from './components/Layouts/DefaultLayout/DefaultLayout';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            {publicRoutes.map((route, index) => {
               const Page = route.component;
               let Layout = DefaultLayout;

               if (route.layout) {
                  Layout = route.layout;
               }

               return (
                  <Route
                     key={index}
                     path={route.path}
                     element={
                        <Layout>
                           <Page />
                        </Layout>
                     }
                  />
               );
            })}
         </Routes>
      </BrowserRouter>
   );
}

export default App;
