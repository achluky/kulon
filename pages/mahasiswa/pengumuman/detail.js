import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Head from '../../../components/head_modif';
import Header from '../../../components/dosen_header';
import Side from '../../../components/dosen_sidebar';
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
                                    <span className="navbar-brand mb-0 h1">Informasi : Soal</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Nama Soal</label>
                                        <div className="col-sm-10">
                                        <label className="col-sm-10 col-form-label">: Soal 1</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Nama Modul</label>
                                        <div className="col-sm-10">
                                        <label className="col-sm-10 col-form-label">:{' '}
                                        <Link href="/dosen/modul/detail">
                                        <span className="badge bg-primary">Array</span>
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
                                    <div className=" row">
                                        <label className="col-sm-2 col-form-label">Soal</label>
                                        <div className="col-sm-10">: 
                                        </div>
                                    </div>
                                    <div className=" row">
                                        <p className="col-sm-12 col-form-label">
                                            Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height. Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.
                                        </p>
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