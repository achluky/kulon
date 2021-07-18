import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTags } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../components/mahasiswa_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../utility/utils';
import Login from '../../components/login';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';

export default function Kelas({kelas, profil}) {
    return(
        <div>    
            {!profil ? (
                <Login/>
            ) : (            
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light mb-3">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Kelas Perkuliahan Anda</span>
                                    <div className="float-end">
                                        <Link href="/mahasiswa/kelas/all">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faSearch }/> Cari Kelas </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>

                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col" width={10}>No.</th>
                                            <th scope="col">Kelas</th>
                                            <th scope="col">Semester</th>
                                            <th scope="col">Program Studi</th>
                                            <th scope="col" width={245}>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {kelas.map((kls, index) => (
                                            <tr key={index}>
                                                <td scope="row">{++index}</td>
                                                <td>{kls.nama_kelas}</td>
                                                <td>{kls.nama_semester}</td>
                                                <td>{kls.nama_prodi}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href={"/mahasiswa/kelas/detail/"+kls.id_kelas+""}>
                                                            <button type="button" className="btn btn-primary btn-sm">
                                                                <FontAwesomeIcon icon={ faSearch }/> Detail 
                                                            </button>
                                                        </Link>
                                                        <Link href={"/mahasiswa/kelas/latihan/"+kls.id_kelas+""}>
                                                            <button type="button" className="btn btn-info btn-sm">
                                                                <FontAwesomeIcon icon={ faTags }/> Latihan 
                                                            </button>
                                                        </Link>
                                                        {kls.status==1 ? (
                                                            <>
                                                                <button type="button" className="btn btn-danger btn-sm">
                                                                    <FontAwesomeIcon icon={ faTags }/> Aktif 
                                                                </button>
                                                            </>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {

    /**
     * Ketika Kelas diset tidak aktif oleh dosen atau mhs tersebut lulus maka mhs tersebut diupdate status latihanya adalah tidak aktif pada dokumen: data__kelas_mahasiswa
     *  
     **/
    const { req } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);
    
    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/kelas/mahasiswa/${profil.nim_nidn}`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();

    return {
        props: {
            profil,
            kelas: kelas,
        },
    };
}

  