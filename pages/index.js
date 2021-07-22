import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  absoluteUrl,
  getAppCookies,
  verifyToken
} from '../utility/utils';
import {useState} from 'react'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function Home({dosen}) {
  const [key, setKey] = useState('home');
  return (
    <>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h3 className="display-6 fw-normal">Kuliah Online (Kulon)
          </h3>
          <p className="fs-5 text-muted">
              Kulon Salah Satu Saranan Pembelajaran Online yang Diperuntukan Untuk Mendukung Matakuliah Bahasa Pemrograman
          </p>
        </div>

        <main>
          <div className="row">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
               <Tab eventKey="home" title="Tentang Aplikasi">

                  <div className="home mt-2">Aplikasi ini memiliki beberapa fitur di ataranya adalah menejemen kelas, modul, pertemuan mingguan, latihan, ujian dan lain-lain. Selain itu aplikasi ini memiliki fasilitas <span className="badge bg-secondary">SEB</span> (Save Exam Browser) yang dapat digunakan pada evaluasi pembelajara. Evaluasi pembelajaran ini diharapkan dapat membatasi mahasiswa dalam melakukan perbuatan curang.
                  </div>
                  
              </Tab>
              <Tab eventKey="profile" title="Dosen">

                  <div className="mt-2">
                    Daftar Dosen Pengajar:

                    {dosen.map((d, index) => (
                      <ol key={index}>
                        <li>{d.name} (<FontAwesomeIcon icon={ faEnvelope }/>  {d.email})</li>
                      </ol>
                    ))}
                  </div>

              </Tab>
              <Tab eventKey="dosen" title="Pengembang">

                  <div className=" mt-2">
                    Pengembang Aplikasi:
                      <ul className="list-unstyled">
                        <li><FontAwesomeIcon icon={ faGithub }/> ahmadluky</li>
                      </ul>

                  </div>

              </Tab>
          </Tabs>

          </div>
        </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const baseApiUrl = `${origin}/api/dosen`;
  const result = await fetch(baseApiUrl)
  const dosen = await result.json();

  return {
    props: {
      dosen
    },
  };
}
