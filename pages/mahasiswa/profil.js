import Image from 'next/image'
import profilePic from '../../public/me.jpg'
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
                                <span className="navbar-brand mb-0 h1">Profil</span>
                            </div>
                        </nav>
                        <div className="pb-3"></div>
                        
                        <div className="row align-items-md-stretch">
                            <div className="col-md-3">
                                <Image src={profilePic} className="img-fluid rounded float-start" alt="Picture of the author" />
                            </div>
                            <div className="col-md-9">
                                <div className="h-80 p-4 border rounded-3">

                                <dl className="row">
                                    <dt className="col-sm-3">Nama</dt>
                                    <dd className="col-sm-9">Naufal Al Arkham Ahmad</dd>

                                    <dt className="col-sm-3">NIM</dt>
                                    <dd className="col-sm-9">A02187923</dd>
                                </dl>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}