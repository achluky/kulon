import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faDownload, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';

export default function Detail({modul, profil}){
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
                                    <span className="navbar-brand mb-0 h1">Informasi : Modul Perkuliahan</span>
                                    <div className="float-end">
                                        <Link href="/dosen/modul">
                                            <button type="button" className="btn btn-primary btn-sm">
                                                <FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali 
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-3 ">Nama Modul</label>   
                                        <div className="col-sm-9">
                                            <label className="col-sm-10 ">: {modul.nama_modul}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-3 ">Deskripsi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">: </label>
                                        </div>
                                        <div className="col-sm-12 highlight mt-3">
                                        {modul.deskripsi_modul}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 ">Semester</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">: {modul.nama_semester}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 ">Program Studi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">: {modul.nama_prodi}</label>
                                        </div>
                                    </div>
                                    <div className=" row">
                                        <label  className="col-sm-3 ">Dokumen Modul</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 ">:{' '}
                                            <Link href={modul.nama_file} >
                                                <label><FontAwesomeIcon icon={ faDownload }/> Download</label>
                                            </Link>
                                        </label>
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
    const baseApiUrl = `${origin}/api/modul/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const modul = await result.json();

    return {
        props: {
            baseApiUrl,
            profil,
            modul: modul,
        },
    };
}
