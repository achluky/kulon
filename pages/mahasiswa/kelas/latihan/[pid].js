import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import Image from 'next/image'
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';
import profilePic from '../../../../public/me.jpeg';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Latihan({profil, kelas_material, origin}){
    const router = useRouter();
    
    function Kerjakan(id_kelas_material) {
        Swal.fire({
            title: 'Masukan Token',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Kerjakan',
            showLoaderOnConfirm: true,
            preConfirm: async (token) => {
                try {
                    const response = await fetch(`${origin}/api/kelas_material/token/${id_kelas_material}/${token}`);
                    if (!response.status) {
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
                if(result.value.status){
                    Swal.fire(
                            'Valid', 
                            'Token yang anda masukan benar', 
                            'success');
                    router.push(`/mahasiswa/soal/${id_kelas_material}/${result.value.id_soal}`);
                }else{
                    Swal.fire(
                        'Tidak Valid',
                        result.value.statusText,
                        'info'
                    )
                }
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

                                {kelas_material.map((kls_materi, index) => (
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                        Minggu Ke - {kls_materi.minggu_ke} [batas waktu pengumpulan: tanggal {kls_materi.deadline}]
                                        {kls_materi.status_pengerjaan == '' ? (
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => Kerjakan(kls_materi.id_kelas_material)}><FontAwesomeIcon icon={ faWindowRestore }/> Kerjakan </button>
                                        ):(
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => Kerjakan(kls_materi.id_kelas_material)}> Lajutkan <FontAwesomeIcon icon={ faWindowRestore }/> </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req, query } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);
    const profil = data ? verifyToken(data) : '';

    const baseApiUrl = `${origin}/api/kelas_material/id_kelas/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const kelas_material = await result.json();
    
    return {
        props: {
            profil,
            kelas_material,
            origin
        }
    };
}
