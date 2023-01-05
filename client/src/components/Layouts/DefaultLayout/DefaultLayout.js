import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';

function DefaultLayout({ children, headerActive }) {
   return (
      <>
         <Header active={headerActive ? true : false} />
         {children}
         <Footer />
      </>
   );
}

export default DefaultLayout;
