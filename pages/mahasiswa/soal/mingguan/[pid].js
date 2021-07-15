import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowRestore} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';

export default function Soal({profil, soal_all}){
    return(
        <div>
            {!profil ? (
                <Login />
            ) : (
                <>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Latihan Minggu Ke -1</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="list-group mt-4">
                                        {soal_all.map((soal, index) => (
                                            <li className="list-group-item d-flex justify-content-between align-items-start"  key={index}>
                                                <div className="ms-2 me-auto">
                                                <div className="">{soal.nama_soal}</div>
                                                </div>
                                                <div className="float-end">
                                                    <Link href={"/mahasiswa/soal/"+ soal.id_kelas_material +"/"+ soal.id_soal }>
                                                        <button type="button" className="btn btn-primary btn-sm">
                                                            <FontAwesomeIcon icon={ faWindowRestore }/> Kerjakan 
                                                        </button>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}


export async function getServerSideProps(context) {
    const { req, query } = context; // id_kelas_material
    const { data } = getAppCookies(req);
    const { origin } = absoluteUrl(req);
    const profil = data ? verifyToken(data) : '';
    
    const baseApiUrl_soal_all = `${origin}/api/soal/kelas_material/${query.pid}`;
    const result_soal_all = await fetch(baseApiUrl_soal_all)
    const soal_all = await result_soal_all.json();

    return {
        props: {
            profil,
            soal_all,
        }
    };
}