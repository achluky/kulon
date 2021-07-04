import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faBookReader, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function dosen_sidebar() {
  return (
          <>
            <ul className="list-group mb-3">
                <Link href={'/dosen/beranda'}>
                  <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faHome }/>{' '}Beranda</li>
                </Link>
                <Link href={'/dosen/kelas'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faBookReader }/>{' '}Kelas</li>
                </Link>
                <Link href={'/dosen/modul'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faListAlt }/>{' '}Modul</li>
                </Link>
                <Link href={'/dosen/soal'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faListAlt }/>{' '}Soal</li>
                </Link>
                <Link href={'/dosen/pengumuman'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faListAlt }/>{' '}Pengumuman</li>
                </Link>
            </ul>
            <ul className="list-group">
              <Link href={'/dosen/profil'}>
                <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faUserCircle }/>{' '}Profil</li>
              </Link>
            </ul>
          </>
  );
}