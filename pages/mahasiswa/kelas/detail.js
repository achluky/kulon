import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faListAlt } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Head from '../../../components/head_modif';
import Header from '../../../components/mahasiswa_header';
import Side from '../../../components/mahasiswa_sidebar';
import Footer from '../../../components/footer';
import Link from 'next/link';

export default function Detail(){
    return(
        <div>
            <Head></Head>
            <div className="container py-3">
                <Header></Header>
                
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Informasi : Kelas Perkuliahan Anda</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Nama Kelas</label>
                                        <div className="col-sm-10">
                                        <label className="col-sm-10 col-form-label">: AB.1</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Dosen</label>
                                        <div className="col-sm-10">
                                        <label className="col-sm-10 col-form-label">: {''}
                                            <Link href="/mahasiswa/modul/detail">
                                                <span className="badge bg-primary">@alr</span>
                                            </Link>
                                        </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Program Studi</label>
                                        <div className="col-sm-10">
                                        <label className="col-sm-10 col-form-label">: Teknik Informatika</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Kode Kelas</label>
                                        <div className="col-sm-10">
                                        <label className="col-sm-10 col-form-label">: AWQX-98</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>
        </div>
    );
}