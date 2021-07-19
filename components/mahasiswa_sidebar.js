import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faBookReader, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from '../utility/activeLink';


export default function dosen_sidebar() {
  return (
            <div>
              <ul className="list-group mb-3">
                  <Link activeClassName="active" href={'/mahasiswa/beranda'}>
                    <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faHome }/>{' '}Beranda</li>
                  </Link>
                  <Link activeClassName="active" href={'/mahasiswa/kelas'}>
                    <li className="list-group-item"><FontAwesomeIcon icon={ faBookReader }/>{' '}Kelas Anda</li>
                  </Link>
                  <Link activeClassName="active" href={'/mahasiswa/modul'}>
                    <li className="list-group-item"><FontAwesomeIcon icon={ faListAlt }/>{' '}Modul</li>
                  </Link>
              </ul>
              <ul className="list-group">
                <Link activeClassName="active" href={'/mahasiswa/profil'}>
                  <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faUserCircle }/>{' '}Profil</li>
                </Link>
              </ul>
          </div>
  );
}