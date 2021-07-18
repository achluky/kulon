import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader, faListAlt, faStopwatch, faUserAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../components/mahasiswa_sidebar';
import Login from '../../components/login';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
  } from '../../utility/utils';
export default function Beranda({profil, kelas_mhs_aktif}){
    return(
        <>
            {!profil ? (
                <Login />
            ) : (
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <Side />
                        </div>
                        <div className="col-sm-9">
                            <nav className="navbar navbar-light bg-light mb-3">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Beranda</span>
                                </div>
                            </nav>

                            <div className="bg-light p-4 rounded">
                                <dl className="row">
                                    <dd className="col-sm-4">Nama Lengkap</dd>
                                    <dd className="col-sm-8">: {profil.name}</dd>

                                    <dd className="col-sm-4">NIDN</dd>
                                    <dd className="col-sm-8">: {profil.nim_nidn}</dd>

                                    <dd className="col-sm-4">Email</dd>
                                    <dd className="col-sm-8">: {profil.email}</dd>
                                </dl>
                            </div>

                            <div className="row row-cols-1 row-cols-md-4 mb-3 mt-4 text-center">
                                
                                <div className="col">
                                    <Link href={'/mahasiswa/kelas'}>
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-body">
                                            <FontAwesomeIcon icon={ faBookReader } size="6x" />
                                            <ul className="list-unstyled mt-3 mb-4">
                                            <li>Kelas Perkuliahan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </Link>
                                </div>

                                <div className="col">
                                    <Link href={'/mahasiswa/modul'}>
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-body">
                                            <FontAwesomeIcon icon={ faListAlt } size="6x" />
                                            <ul className="list-unstyled mt-3 mb-4">
                                            <li>Modul Perkuliahan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </Link>
                                </div>

                                <div className="col">
                                    <Link href={'/mahasiswa/profil'}>
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-body">
                                            <FontAwesomeIcon icon={ faUserCircle } size="6x" />
                                            <ul className="list-unstyled mt-3 mb-4">
                                            <li>Profil</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </Link>
                                </div>

                                <div className="col">
                                    <Link href={'/mahasiswa/kelas/latihan/'+ kelas_mhs_aktif.id_kelas}>
                                    <div className="mb-4 rounded-3 shadow-sm btn btn-primary">
                                        <div className="card-body">
                                            <FontAwesomeIcon icon={ faStopwatch } size="6x" />
                                            <ul className="list-unstyled mt-3 mb-4">
                                            <li>Kerjakan Latihan</li>
                                            </ul>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export async function getServerSideProps(context) {
    const { req } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);

    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/kelas_mahasiswa/bynim/${profil.nim_nidn}`;
    const result = await fetch(baseApiUrl)
    const kelas_mhs_aktif = await result.json();

    return {
        props: {
            profil,
            kelas_mhs_aktif
        },
    };
}
