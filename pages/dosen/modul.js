import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlusCircle, faTrash, faSearch, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../components/dosen_sidebar';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../utility/utils';
import Login from '../../components/login';
import { kelasService } from '../../services';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Kelas({kelas, profil}) {
    const [stateFormMessage, setStateFormMessage] = useState({});
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    
    function deleteKelas(id_kelas) {
        Swal.fire({
            type: 'question',
            title: 'Konfirmasi',
            text: "Apakah Anda Yakin akan Menghapus Data Kelas?",
            timer: 3000,
            showCancelButton: true
        }).then(data => {
            if (data.value === true) {
               deleteApi(id_kelas)
            }
        })
    }

    async function deleteApi(id_kelas) {
        const data = {
            id_kelas : id_kelas
        }
        const result = await kelasService.deleteKelas(data);
        setStateFormMessage(result);
        if (result.error === false) {
            refreshData();
        }
    }

    return(
        <div>    
            {!profil ? (
                <Login/>
            ) : (            
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light mb-3">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Modul Perkuliahan</span>
                                    <div className="float-end">
                                        <Link href="/dosen/modul/tambah">
                                            <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faPlusCircle }/> Tambah </button>
                                        </Link>
                                    </div>
                                </div>
                            </nav>

                            {stateFormMessage.error && (            
                                <div className="alert alert-danger" role="alert">
                                    <FontAwesomeIcon icon={ faTimesCircle }/> {stateFormMessage.message}
                                </div>
                            )}

                            {stateFormMessage.error===false && (            
                                <div className="alert alert-primary" role="alert">
                                    <FontAwesomeIcon icon={ faCheckCircle }/> {stateFormMessage.message}
                                </div>
                            )}
                            
                            <div className="card">
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Nama Modul</th>
                                            <th scope="col">Semester</th>
                                            <th scope="col">Program Studi</th>
                                            <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {kelas.map((kls, index) => (
                                            <tr key={index}>
                                                <td scope="row">{++index}</td>
                                                <td>{kls.nama_modul}</td>
                                                <td>{kls.nama_semester}</td>
                                                <td>{kls.nama_prodi}</td>
                                                <td width={228}>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <Link href= {"/dosen/modul/edit/"+kls.id_modul+""} >
                                                            <button type="button" className="btn btn-primary btn-sm">
                                                                <FontAwesomeIcon icon={ faEdit }/> Edit 
                                                            </button>
                                                        </Link>
                                                        <Link href={"/dosen/modul/detail/"+kls.id_modul+""}>
                                                            <button type="button" className="btn btn-primary btn-sm">
                                                                <FontAwesomeIcon icon={ faSearch }/> Detail 
                                                            </button>
                                                        </Link>
                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteKelas(kls.id_modul)} >
                                                            <FontAwesomeIcon icon={ faTrash }/> Delete 
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);
    
    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/modul`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();

    return {
        props: {
            baseApiUrl,
            profil,
            kelas: kelas,
        },
    };
}

  