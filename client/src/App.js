import { useState } from 'react';
import { Fragment } from 'react';
import 'swiper/swiper.min.css';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { publicRoutes } from './routes';

import Home from './components/pages/Home';
import Login from './components/pages/authentic/LogIn';

// import CustomRoutes from './config/Routes';
import DefaultLayout from './components/Layouts/DefaultLayout/DefaultLayout';
import SignUp from './components/pages/authentic/SignUp';

function App() {
   const user = true;

   return (
      <BrowserRouter>
         <div className="App">
            <Routes>
               <Route
                  path="/signup"
                  exact
                  element={!user ? <SignUp /> : <Navigate to="/" />}
               />
               <Route
                  path="/login"
                  exact
                  element={!user ? <Login /> : <Navigate to="/" />}
               />
               {user &&
                  publicRoutes.map((route, index) => {
                     const Page = route.component;
                     let props = null;
                     let Layout = DefaultLayout;

                     if (route.headerActive) {
                        props = { headerActive: route.headerActive };
                     }

                     if (route.layout) {
                        Layout = route.layout;
                     }

                     return (
                        <Route
                           key={index}
                           path={route.path}
                           element={
                              <Layout
                                 headerActive={
                                    props ? props.headerActive : null
                                 }
                              >
                                 <Page />
                              </Layout>
                           }
                        />
                     );
                  })}
            </Routes>
         </div>
      </BrowserRouter>
   );
}

export default App;
