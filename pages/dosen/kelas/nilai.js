import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faListAlt } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Head from '../../../components/head_modif';
import Header from '../../../components/dosen_header';
import Side from '../../../components/dosen_sidebar';
import Footer from '../../../components/footer';
import Link from 'next/link';

export default function Nilai(){
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
                                    <span className="navbar-brand mb-0 h1">Nilai : Kelas Perkuliahan</span>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Nama Peserta</th>
                                            <th scope="col">NIM</th>
                                            <th scope="col">Nilai Latihan*</th>
                                            <th scope="col">Nilai UTS*</th>
                                            <th scope="col">Nilai UAS*</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td scope="row">1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
                                            </tr>
                                            <tr>
                                            <td scope="row">2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>100</td>
                                            <td>100</td>
                                            <td>100</td>
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