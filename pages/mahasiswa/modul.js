import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusCircle, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Head from '../../components/head_modif';
import Header from '../../components/mahasiswa_header';
import Side from '../../components/mahasiswa_sidebar';
import Footer from '../../components/footer';
import Link from 'next/link';

export default function Modul(){
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
                                    <span className="navbar-brand mb-0 h1">Modul Perkuliahan</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>

                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Judul Modul</th>
                                            <th scope="col">Program Studi</th>
                                            <th scope="col" width="100px;">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="row">1</td>
                                                <td>Array</td>
                                                <td>Teknik Informatika</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/mahasiswa/modul/detail">
                                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faSearch }/> Detail </button>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td scope="row">2</td>
                                                <td>Matrix</td>
                                                <td>Teknik Informatika</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href="/mahasiswa/modul/detail">
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

                <Footer></Footer>
            </div>
        </div>
    );
}