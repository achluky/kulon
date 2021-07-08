import Side from '../../components/mahasiswa_sidebar';
import Login from '../../components/login';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken,
  } from '../../utility/utils';
export default function Beranda({profil}){
    return(
        <>
            {!profil ? (
                <Login />
            ) : (
                <div>
                    <div className="row">
                        <div className="col-sm-3">
                            <Side />
                        </div>
                        <div className="col-sm-9">
                            <nav className="navbar navbar-light bg-light mb-3">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Beranda</span>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export async function getServerSideProps(context) {
    const { req } = context;
    const { data } = getAppCookies(req);
    const profil = data ? verifyToken(data) : '';
    return {
        props: {
            profil,
        },
    };
}
