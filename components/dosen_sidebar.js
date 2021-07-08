import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faBookReader, faHome, faUserCircle, faVolumeDown, faCode } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faCodepen, faCodiepie } from '@fortawesome/free-brands-svg-icons';

export default function dosen_sidebar() {
  return (
          <>
            <ul className="list-group mb-3">
                <Link href={'/dosen/beranda'}>
                  <li className="list-group-item" aria-current="true"><FontAwesomeIcon icon={ faHome }/>{' '}Beranda</li>
                </Link>
                <Link href={'/dosen/kelas'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faBookReader }/>{' '}Kelas Anda</li>
                </Link>
                <Link href={'/dosen/modul'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faListAlt }/>{' '}Modul</li>
                </Link>
                <Link href={'/dosen/soal'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faCode }/>{' '}Soal</li>
                </Link>
                <Link href={'/dosen/pengumuman'}>
                  <li className="list-group-item"><FontAwesomeIcon icon={ faVolumeDown }/>{' '}Pengumuman</li>
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