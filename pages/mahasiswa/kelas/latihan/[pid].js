import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faThumbtack} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import Image from 'next/image'
import {
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';
import profilePic from '../../../../public/me.jpeg';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Latihan({profil}){
    const router = useRouter();
    
    function Kerjakan() {
        Swal.fire({
            title: 'Masukan Token',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Kerjakan',
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                try {
                    const response = await fetch(`//api.github.com/users/${login}`);
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return await response.json();
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
        if (result.isConfirmed) {
                router.push("/mahasiswa/latihan");
            }
        })
    }

    return(
        <div>
            {!profil ? (
                <Login />
            ) : (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Latihan</span>
                                    <div className="float-end">
                                        <Link href="/mahasiswa/kelas">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col">
                                            <dl className="row">
                                                <dd className="col-sm-3">Nama</dd>
                                                <dd className="col-sm-9">: {profil.name}</dd>

                                                <dd className="col-sm-3">NIM</dd>
                                                <dd className="col-sm-9">: {profil.nim_nidn}</dd>

                                                <dd className="col-sm-3">Email</dd>
                                                <dd className="col-sm-9">: {profil.email}</dd>
                                            </dl>
                                        </div>
                                        <div className="col">   
                                            <div className="col-md-3 float-end">                             
                                                <Image src={profilePic} className="img-fluid rounded float-start" alt="Picture of the author" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3"></div>
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Minggu Ke - 1
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => Kerjakan()}><FontAwesomeIcon icon={ faThumbtack }/> Kerjakan </button>
                                </li>
                            </ul>
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
    console.log(profil);
    return {
        props: {
            profil
        }
    };
}
