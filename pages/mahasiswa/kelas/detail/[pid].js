import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/mahasiswa_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';

export default function Detail({kelas, profil}){
    return(
        <div>
            {!profil ? (
                <Login />
            ) : (
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Informasi : Kelas Perkuliahan</span>
                                    <div className="float-end">
                                        <Link href="/mahasiswa/kelas">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">Nama Kelas</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_kelas}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Semester</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_semester}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Program Studi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_prodi}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Dosen Pengajar</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_dosen}</label>
                                        </div>
                                    </div>       
                                </div>
                            </div>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-header ">
                                    <p class="card-title">Masuk Ke dalam Kelas?</p>
                                </div>
                                <div className="card-body p-4">
                                    <div className=" row">
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Kode Kelas</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Masukan Kode Kelas" />
                                            <div id="emailHelp" class="form-text">Kode Kelas merupakan kode rahasia yang akan diberikan oleh dosen untuk mahasiswa yang diizinkan masuk dalam suatu kelas</div>
                                        </div>
                                        <div class="mb-3">
                                            <button className="btn btn-primary" type="button" id="button-addon2">
                                                <FontAwesomeIcon icon={ faUserPlus }/> Masuk Sebagai Peserta Kelas
                                            </button>
                                        </div>
                                    </div>                                
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

    const { req, query } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);

    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/kelas/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();

    return {
        props: {
            baseApiUrl,
            profil,
            kelas: kelas,
        },
    };
}
