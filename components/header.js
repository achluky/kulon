import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignInAlt, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  setLogout,
} from '../utility/utils';

function handleOnClickLogout(e) {
  setLogout(e);
}

export default function login({props}) {
  const { profil } = props;
  
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link href={'/'}>
        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span className="fs-4">Kulon</span>
        </a>
      </Link>
      <ul className="nav nav-pills">
        <Link href={'/'}>
          <li className="nav-item"> <p className="nav-link" aria-current="page"> <FontAwesomeIcon icon={ faHome }/> Beranda</p></li>
        </Link>
        {!profil ? (
          <>          
            <Link href={'/masuk'}>
              <li className="nav-item"> <p className="nav-link" aria-current="page"> <FontAwesomeIcon icon={ faSignInAlt }/> Login </p></li>
            </Link> 
          </>
        ) : (
          <>
            <li className="nav-item"> 
              <p className="nav-link" aria-current="page"> <FontAwesomeIcon icon={ faUserCircle }/> {profil.name}</p>
            </li>
            <li className="nav-item" >
              <p className="nav-link" aria-current="page" onClick={e => handleOnClickLogout(e)}> <FontAwesomeIcon icon={ faSignOutAlt }/>  Logout</p>
            </li>

          </>
        )}
      </ul>
    </header>
  );
}