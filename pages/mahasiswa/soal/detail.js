import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons'
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
                                    <span className="navbar-brand mb-0 h1">Informasi : Soal</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <label className="col-sm-2 col-form-label">Judul Soal</label>
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
                                </div>
                            </div>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-header">
                                    Soal
                                </div>
                                <div className="card-body p-4">
                                    <div className=" row">
                                        <p className="col-sm-12 col-form-label">
                                            Or, keep it light and add a border for some added definition to the boundaries of your content. 
                                            Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height. Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.
                                        </p>
                                        <p className="col-sm-12 col-form-label">
                                            Or, keep it light and add a border for some added definition to the boundaries of your content. 
                                            Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height. Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-header">
                                    Upload Code
                                </div>
                                <div className="card-body p-4">
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option selected>Pilih Bahasa Pemrograman</option>
                                            <option value="1">C</option>
                                            <option value="2">C++</option>
                                            <option value="3">Python</option>
                                        </select>
                                        <label>Bahasa Pemrograman</label>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">File Code (.pdf)</label>
                                        <input className="form-control" type="file" id="formFile" />
                                    </div>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-primary me-md-2" type="button"><FontAwesomeIcon icon={ faCog }/>Compile</button>
                                        <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={ faSave }/> Simpan & Compile</button>
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