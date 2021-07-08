import Image from 'next/image'
import profilePic from '../../public/me.jpeg'
import Side from '../../components/mahasiswa_sidebar';
import Login
 from '../../components/login';
import {
     getAppCookies,
     verifyToken
 } from '../../utility/utils';
export default function Beranda({profil}){
    console.log(profil);

    return(
        <div>
            {!profil ? (
                <Login />
            ) : (     
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <nav className="navbar navbar-light bg-light mb-3">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Profil</span>
                            </div>
                        </nav>
                        <div className="row align-items-md-stretch">
                            <div className="col-md-3">
                                <Image src={profilePic} className="img-fluid rounded float-start" alt="Picture of the author" />
                            </div>
                            <div className="col-md-9">
                                <div className="h-80 p-4 border rounded-3">
                                    <dl className="row">
                                        <dt className="col-sm-3">Nama</dt>
                                        <dd className="col-sm-9">: {profil.name}</dd>

                                        <dt className="col-sm-3">NIDN</dt>
                                        <dd className="col-sm-9">: {profil.nim_nidn}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export async function getServerSideProps(context) {

    const { req } = context;
    const { data } = getAppCookies(req);
    
    const profil = data ? verifyToken(data) : '';
    return {
        props: {
            profil
        },
    };
}

  