import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faInfoCircle, faSave } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../components/dosen_sidebar';
export default function Tambah(){
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
                                    <span className="navbar-brand mb-0 h1">Tambah : Pengumuman</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="alert alert-primary" role="alert">
                                <p><FontAwesomeIcon icon={ faInfoCircle }/> Informasi </p> 
                                <hr />
                                <p>Pengumuman terakhir anda tambahkan adalah pengumuman yang aktif dan dapat terlihat di halaman utama mahasiswa.</p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                        <div className="form-floating mb-3">
                                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                                            <label>Pengumuman</label>
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