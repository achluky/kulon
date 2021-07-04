import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faCode, faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function Head_modif({ children }) {
  return (
    <Head>
    <title>Kulon</title>
    <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
