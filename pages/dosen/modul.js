import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusCircle, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../components/dosen_sidebar';
import Link from 'next/link';

export default function Modul(){
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
                                    <span className="navbar-brand mb-0 h1">Modul Perkuliahan</span>
                                    <div className="float-end">
                                    <Link href="/dosen/modul/tambah">
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
                                            <th scope="col">Judul Modul</th>
                                            <th scope="col">Program Studi</th>
                                            <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">1</td>
                                                <td>Array</td>
                                                <td>Teknik Informatika</td>
                                                <td width="155px;">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/dosen/modul/edit">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faEdit }/> Edit </button>
                                                        </Link>
                                                        <Link href="/dosen/modul/detail">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faSearch }/> Detail </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">2</td>
                                                <td>Matrix</td>
                                                <td>Teknik Informatika</td>
                                                <td width="155px;">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/dosen/modul/edit">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faEdit }/> Edit </button>
                                                        </Link>
                                                        <Link href="/dosen/modul/detail">
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