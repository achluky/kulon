import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusCircle, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../components/dosen_sidebar';
import Link from 'next/link';

export default function Soal(){
    return(
        <div>
            <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light mb-3">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Soal</span>
                                    <div className="float-end">
                                    <Link href="/dosen/soal/tambah">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faPlusCircle }/> Tambah </button>
                                    </Link>
                                </div>
                                </div>
                            </nav>

                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Judul Soal</th>
                                            <th scope="col">Modul</th>
                                            <th scope="col">Program Studi</th>
                                            <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">1</td>
                                                <td>Soal 1</td>
                                                <td>Array</td>
                                                <td>Teknik Informatika</td>
                                                <td width="155px;">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/dosen/soal/edit">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faEdit }/> Edit </button>
                                                        </Link>
                                                        <Link href="/dosen/soal/detail">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faSearch }/> Detail </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">2</td>
                                                <td>Soal 2</td>
                                                <td>Array</td>
                                                <td>Teknik Informatika</td>
                                                <td width="155px;">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/dosen/soal/edit">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faEdit }/> Edit </button>
                                                        </Link>
                                                        <Link href="/dosen/soal/detail">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faSearch }/> Detail </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
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