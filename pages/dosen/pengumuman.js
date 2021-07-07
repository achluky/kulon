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
import { pengumumanService } from '../../services';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Soal({pengumuman, profil}) {
    const [stateFormMessage, setStateFormMessage] = useState({});
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    
    function deleteKelas(id_pengumuman) {
        Swal.fire({
            type: 'question',
            title: 'Konfirmasi',
            text: "Apakah Anda Yakin akan Menghapus Data Kelas?",
            timer: 3000,
            showCancelButton: true
        }).then(data => {
            if (data.value === true) {
               deleteApi(id_pengumuman)
            }
        })
    }

    async function deleteApi(id_pengumuman) {
        const data = {
            id_pengumuman : id_pengumuman
        }
        const result = await pengumumanService.deletePengumuman(data);
        setStateFormMessage(result);
        if (result.error === false) {
            refreshData();
        }
    }

    const list = [];
    pengumuman.map((pengumuman_, index) => (
        list.push(
            <tr key={index}>
                <td scope="row">{++index}</td>
                <td>{pengumuman_.judul}</td>
                <td>{pengumuman_.nama_semester}</td>
                <td width={228}>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <Link href= {"/dosen/pengumuman/edit/"+pengumuman_.id_pengumuman+""} >
                            <button type="button" className="btn btn-primary btn-sm">
                                <FontAwesomeIcon icon={ faEdit }/> Edit 
                            </button>
                        </Link>
                        <Link href={"/dosen/pengumuman/detail/"+pengumuman_.id_pengumuman+""}>
                            <button type="button" className="btn btn-primary btn-sm">
                                <FontAwesomeIcon icon={ faSearch }/> Detail 
                            </button>
                        </Link>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteKelas(pengumuman_.id_pengumuman)} >
                            <FontAwesomeIcon icon={ faTrash }/> Delete 
                        </button>
                    </div>
                </td>
            </tr>
        )
    ))


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
                                    <span className="navbar-brand mb-0 h1">Kumpulan Pengumuman Kelas Anda</span>
                                    <div className="float-end">
                                        <Link href="/dosen/pengumuman/tambah">
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
                                            <th scope="col">Judul</th>
                                            <th scope="col">Tahun Ajaran</th>
                                            <th scope="col">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list}
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
    const baseApiUrl = `${origin}/api/pengumuman`;
    const result = await fetch(baseApiUrl)
    const pengumuman = await result.json();

    return {
        props: {
            baseApiUrl,
            profil,
            pengumuman: pengumuman,
        },
    };
}

  