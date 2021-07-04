
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from "../components/head_modif";
import Header from '../components/header';
import Footer from '../components/footer';
import NextNProgress from 'nextjs-progressbar';
import PropTypes from 'prop-types';
// import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress 
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      <Head></Head>
      <div className="container py-3">
          <Header
            props={pageProps}
          />
            <Component {...pageProps} />
          <Footer />
      </div>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
