import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faEdit, faPlusCircle,faTrash } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../components/dosen_sidebar';
import Link from 'next/link';

export default function Pengumuman(){
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
                                    <span className="navbar-brand mb-0 h1">Pengumuman</span>
                                    <div className="float-end">
                                    <Link href="/dosen/pengumuman/tambah">
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
                                            <th scope="col">Pengumuman</th>
                                            <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">1</td>
                                                <td>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</td>
                                                <td width="155px;">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/dosen/pengumuman/edit">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faEdit }/> Edit </button>
                                                        </Link>
                                                        <Link href="/dosen/pengumuman/delete">
                                                            <button type="button" className="btn btn-danger btn-sm"><FontAwesomeIcon icon={ faTrash }/> Delete </button>
                                                        </Link>
                                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faCheck }/> Aktif </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">2</td>
                                                <td>Use our background utility classes to quickly change the appearance of a badge. Please note that when using Bootstrap’s default .bg-light, you’ll likely need a text color utility like .text-dark for proper styling. This is because background utilities do not set anything but background-color.</td>
                                                <td width="155px;">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/dosen/pengumuman/edit">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faEdit }/> Edit </button>
                                                        </Link>
                                                        <Link href="/dosen/pengumuman/delete">
                                                            <button type="button" className="btn btn-danger btn-sm"><FontAwesomeIcon icon={ faTrash }/> Delete </button>
                                                        </Link>
                                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faBan }/> No-Aktif </button>
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