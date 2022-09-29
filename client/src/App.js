// import classnames from 'classnames/bind';
import 'swiper/swiper.min.css';

import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import CustomRoutes from './config/Routes';

function App() {
   return (
      <BrowserRouter>
         <Header />
         <CustomRoutes />
         <Footer />
      </BrowserRouter>
   );
}

export default App;
