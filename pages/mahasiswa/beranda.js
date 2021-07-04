import Side from '../../components/mahasiswa_sidebar';

export default function Beranda(){
    return(
        <div>
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Beranda</span>
                            </div>
                        </nav>
                        <div className="pb-3"></div>
                        <div className="alert alert-primary" role="alert">
                            <h6>Pengumuman</h6>
                            A simple primary alert—check it out!
                        </div>
                    </div>
                </div>
        </div>
    );
}