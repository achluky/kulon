import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';

export default function Peserta({kelas, kelas_peserta}){
    return(
        <div>
            <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Peserta : Kelas Perkuliahan</span>
                                    <div className="float-end">
                                        <Link href={"/dosen/kelas/detail/"+ kelas.id_kelas} >
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-3 ">Nama Kelas</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">: {kelas.nama_kelas}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 ">Semester</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">: {kelas.nama_semester}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 ">Program Studi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">: {kelas.nama_prodi}</label>
                                        </div>
                                    </div>            
                                </div>
                            </div>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col" width={20}>No.</th>
                                            <th scope="col" width={350}>Nama Peserta</th>
                                            <th scope="col">NIM</th>
                                            <th scope="col">Nilai</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {kelas_peserta.map((p, index) => (
                                            <tr key={index + 1}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{p.nama_mhs}</td>
                                                <td>{p.nim}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    );
}


export async function getServerSideProps(context) {

    const { req, query } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);

    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/kelas/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();

    const baseApiUrl_daftar_peserta = `${origin}/api/kelas_mahasiswa/${query.pid}`;
    const result_perserta = await fetch(baseApiUrl_daftar_peserta)
    const kelas_peserta = await result_perserta.json();
    return {
        props: {
            baseApiUrl,
            profil,
            kelas: kelas,
            kelas_peserta
        },
    };
}
