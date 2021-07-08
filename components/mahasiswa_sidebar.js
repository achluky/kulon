import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faBookReader, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function dosen_sidebar() {
  return (
            <div>
              <ul className="list-group mb-3">
                  <Link href={'/mahasiswa/beranda'}>
                    <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faHome }/>{' '}Beranda</li>
                  </Link>
                  <Link href={'/mahasiswa/kelas'}>
                    <li className="list-group-item"><FontAwesomeIcon icon={ faBookReader }/>{' '}Kelas</li>
                  </Link>
              </ul>
              <ul className="list-group">
                <Link href={'/mahasiswa/profil'}>
                  <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faUserCircle }/>{' '}Profil</li>
                </Link>
              </ul>
          </div>
  );
}