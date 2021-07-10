import Login from '../components/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
    getAppCookies,
    verifyToken,
} from '../utility/utils';
import Link from 'next/link';


export default function Masuk({profil}){
    return (
        <>
            {profil ? (
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Selamat Datang <b>{profil.name}</b></h1>
                    <p className="lead text-muted">
                        Anda login sebagai {profil.tipe}
                    </p>
                    <p>
                        <Link href="/dosen/beranda" >
                        <a className="btn btn-primary my-2">
                        <FontAwesomeIcon icon={ faHome }/>  Beranda {profil.tipe.charAt(0) .toUpperCase() + profil.tipe.slice(1) .toLowerCase()}
                        </a>
                        </Link>
                    </p>
                    </div>
                </div>
            </section>
            ) : (
                <Login />
            )}
        </>
    ) 
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