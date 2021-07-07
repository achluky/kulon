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
            <main className="text-center">
                <p>Selamat Datang <b>{profil.name}</b><br />
                Anda login sebagai {profil.tipe}</p>
                <Link href={"/" +profil.tipe + "/beranda"}>
                    <a className="btn btn-primary mr-2">
                        <FontAwesomeIcon icon={ faHome }/>  Beranda {profil.tipe.charAt(0) .toUpperCase() + profil.tipe.slice(1) .toLowerCase()}
                    </a>
                </Link>
            </main>
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