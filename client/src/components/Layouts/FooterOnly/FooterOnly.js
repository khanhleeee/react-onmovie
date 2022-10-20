import Footer from '~/components/Footer/Footer';

function FooterOnly({ children }) {
   return (
      <>
         {children}
         <Footer />
      </>
   );
}

export default FooterOnly;
