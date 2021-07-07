import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';

export default function Detail({pengumuman, profil}){
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
                                    <span className="navbar-brand mb-0 h1">Informasi : Pengumuman</span>
                                    <div className="float-end">
                                        <Link href="/dosen/pengumuman">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="alert alert-primary" role="alert">
                                Pengumuman ini akan tersampaikan pada setiap kelas yang anda, pada tahun ajaran yang telah ditentukan anda
                            </div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">Judul</label>   
                                        <div className="col-sm-9">
                                            <label className="col-sm-10 col-form-label">: {pengumuman.judul}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">Deskripsi Pengumuman lengkap: </label>   
                                        <div className="col-sm-9">
                                            <label className="col-sm-10 col-form-label">{pengumuman.pengumuman}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Semester</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {pengumuman.nama_semester}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Program Studi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {pengumuman.nama_prodi}</label>
                                        </div>
                                    </div>
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
    const baseApiUrl = `${origin}/api/pengumuman/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const pengumuman = await result.json();

    return {
        props: {
            baseApiUrl,
            profil,
            pengumuman: pengumuman,
        },
    };
}
