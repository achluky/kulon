import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faCode, faSignInAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import {
  getAppCookies,
  verifyToken
} from '../utility/utils';

export default function Home({externalPostData}) {
  return (
    <>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h3 className="display-6 fw-normal">Kuliah Online (Kulon) {' '} 
            <code><FontAwesomeIcon icon={ faCode }/> Programming</code>
          </h3>
          <p className="fs-5 text-muted">
              Kulon merupakan salah satu saranan pembelajaran online yang diperuntukan untuk mendukung matakuliah bahasa pemrograman. 
          </p>
        </div>

        <main>
          <div className="row">
          <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <label className="nav-link active">Tentang Aplikasi</label>
              </li>
              <li className="nav-item">
                <label className="nav-link">Dosen</label>
              </li>
              <li className="nav-item">
                <label className="nav-link" >Ranking</label>
              </li>
              <li className="nav-item">
                <label className="nav-link">Pengembang</label>
              </li>
          </ul>

          <div className="home mt-4">Aplikasi ini memiliki beberapa fitur diataranya adalah menejemen kelas, modul, pertemuan mingguan, latihan, ujian dan lain-lain. Selain itu aplikasi ini memiliki fasilitas SEB (Save Exam Browser) yang dapat digunakan pada evaluasi pembelajara. Evaluasi pembelaaran daiharapkan dapat membatasi mahasiswa dalam melakukan perbuatan curang.
          </div>

          </div>
        </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { data } = getAppCookies(req);  
  const profil = data ? verifyToken(data) : '';

  return {
    props: {
      profil
    },
  };
}
