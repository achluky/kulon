import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faFire, faArrowAltCircleLeft, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';

export default function Detail({kelas, profil}){
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
                                    <span className="navbar-brand mb-0 h1">Informasi : Kelas Perkuliahan</span>
                                    <div className="float-end">
                                        <Link href="/dosen/kelas">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card mb-3">
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
                                        <label  className="col-sm-3 col-form-label">Kode Kelas</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.kode_kelas}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Jumlah Peserta</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: </label>
                                        </div>
                                    </div>
                                    <div className=" row">
                                        <label  className="col-sm-3 col-form-label">Peserta</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {''}
                                            <Link href={"/dosen/kelas/peserta/"+ kelas.id_kelas}>
                                                <button className="btn btn-primary btn-sm" type="submit"><FontAwesomeIcon icon={ faList }/> Daftar Peserta</button>
                                            </Link>
                                        </label>
                                        </div>
                                    </div>                                
                                </div>
                            </div>

                            <button type="button" class="btn btn-primary mb-3 text-center"><FontAwesomeIcon icon={ faPlusCircle }/> Tambahkan Materi dan Latihan Mingguan</button>

                            <div className="card mb-3">
                                <div className="card-body">
                                    <dl className="row">
                                        <dt className="col-sm-5">Minggu Ke-</dt>
                                        <dd className="col-sm-7">1</dd>
                                        <dt className="col-sm-5">Judul</dt>
                                        <dd className="col-sm-7">Pengantar Bahasa Pemrograman</dd>
                                        <dt className="col-sm-5">File Pendukung</dt>
                                        <dd className="col-sm-7">Pengajar1.ppt</dd>
                                        <dt className="col-sm-5">Soal Latihan (Kode Soal/Keyword)</dt>
                                        <dd className="col-sm-7">F6796</dd>
                                    </dl>
                                </div>
                            </div>


                            <div className="card">
                                <div className="card-body">
                                    <dl className="row">
                                        <dt className="col-sm-5">Minggu Ke-</dt>
                                        <dd className="col-sm-7">2</dd>
                                        <dt className="col-sm-5">Judul</dt>
                                        <dd className="col-sm-7">Pengantar Bahasa Pemrograman</dd>
                                        <dt className="col-sm-5">File Pendukung</dt>
                                        <dd className="col-sm-7">Pengajar1.ppt</dd>
                                        <dt className="col-sm-5">Soal Latihan (Kode Soal/Keyword)</dt>
                                        <dd className="col-sm-7">F6796</dd>
                                    </dl>
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

    return {
        props: {
            baseApiUrl,
            profil,
            kelas: kelas,
        },
    };
}
