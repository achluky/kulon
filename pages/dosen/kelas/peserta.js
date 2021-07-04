import Side from '../../../components/dosen_sidebar';
export default function Peserta(){
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
                                    <span className="navbar-brand mb-0 h1">Peserta : Kelas Perkuliahan</span>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td scope="row">1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            </tr>
                                            <tr>
                                            <td scope="row">2</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
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