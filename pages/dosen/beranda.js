import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Link from 'next/link';
import Side from '../../components/dosen_sidebar';
import Login from '../../components/login';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
  } from '../../utility/utils';

export default function Beranda({profil, beranda}){
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

                            <div className="row row-cols-1 row-cols-md-2 mb-3 text-center">
                                
                                <div className="col">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-body">
                                            <h1 className="card-title pricing-card-title">{beranda.data.jml_kelas}</h1>
                                            <ul className="list-unstyled mt-3 mb-4">
                                            <li>Jumlah Kelas Tahun Ajaran 2020/20201 Ganjil</li>
                                            </ul>
                                            <Link href={"/dosen/kelas"}>
                                                <a className="btn btn-primary btn-sm">
                                                <FontAwesomeIcon icon={ faSearchPlus }/> Selengkapnya</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-body">
                                            <h1 className="card-title pricing-card-title">{beranda.data.jml_soal}</h1>
                                            <ul className="list-unstyled mt-3 mb-4">
                                            <li>Jumlah Soal yang Anda Buat </li>
                                            </ul>
                                            <Link href={"/dosen/soal"}>
                                                <a className="btn btn-primary  btn-sm">
                                                <FontAwesomeIcon icon={ faSearchPlus }/> Selengkapnya</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            

                            <div className="bg-light p-4 rounded">
                                <dl className="row">
                                    <dd className="col-sm-4">Nama Lengkap</dd>
                                    <dd className="col-sm-8">: {profil.name}</dd>

                                    <dd className="col-sm-4">NIDN</dd>
                                    <dd className="col-sm-8">: {profil.nim_nidn}</dd>

                                    <dd className="col-sm-4">Email</dd>
                                    <dd className="col-sm-8">: {profil.email}</dd>

                                    <dd className="col-sm-4">Terakhir Login</dd>
                                    <dd className="col-sm-8">: </dd>
                                </dl>
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
    const { data } = getAppCookies(req);
    const { origin } = absoluteUrl(req);
    const profil = data ? verifyToken(data) : '';

    const baseApiUrl = `${origin}/api/beranda/${profil.nim_nidn}`;
    const result = await fetch(baseApiUrl)
    const beranda = await result.json();

    return {
        props: {
            profil,
            beranda
        },
    };
}
