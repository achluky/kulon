import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../../components/dosen_sidebar';
export default function Kelas(){
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
                                    <span className="navbar-brand mb-0 h1">Tambah : Modul Perkuliahan</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body">
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                            <label>Nama Modul</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                <option selected>Pilih Semester</option>
                                                <option value="1">One</option>
                                            </select>
                                            <label>Semester</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                <option selected>Pilih Program Studi</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                            <label>Program Studi</label>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Dokumen Modul (.pdf)</label>
                                            <input className="form-control" type="file" id="formFile" />
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary" type="button"><FontAwesomeIcon icon={ faSave }/> Simpan</button>
                                        </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </div>
    );
}