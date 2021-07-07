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
import { soalService } from '../../services';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Soal({soal, profil}) {
    const [stateFormMessage, setStateFormMessage] = useState({});
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }
    
    function deleteKelas(id_soal) {
        Swal.fire({
            type: 'question',
            title: 'Konfirmasi',
            text: "Apakah Anda Yakin akan Menghapus Data Kelas?",
            timer: 3000,
            showCancelButton: true
        }).then(data => {
            if (data.value === true) {
               deleteApi(id_soal)
            }
        })
    }

    async function deleteApi(id_soal) {
        const data = {
            id_soal : id_soal
        }
        const result = await soalService.deleteSoal(data);
        setStateFormMessage(result);
        if (result.error === false) {
            refreshData();
        }
    }

    function keyword_split(keyword){
        const link_key = []
        if (keyword) {  
            const key = ""+keyword+"".split(',');
            const myArray =  key.split(',');
            myArray.map(name => (  
                link_key.push(
                <Link href={name}>
                    <label className="mb-2">{name}</label> 
                </Link> 
                )
            ))
        }
        return link_key
    }

    const list = [];

    soal.map((sol, index) => (
        list.push(
            <tr key={index}>
                <td scope="row">{++index}</td>
                <td>{sol.nama_soal}</td>
                <td>{sol.nama_modul}</td>
                <td>{keyword_split(sol.keyword)}</td>
                <td width={228}>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <Link href= {"/dosen/soal/edit/"+sol.id_soal+""} >
                            <button type="button" className="btn btn-primary btn-sm">
                                <FontAwesomeIcon icon={ faEdit }/> Edit 
                            </button>
                        </Link>
                        <Link href={"/dosen/soal/detail/"+sol.id_soal+""}>
                            <button type="button" className="btn btn-primary btn-sm">
                                <FontAwesomeIcon icon={ faSearch }/> Detail 
                            </button>
                        </Link>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteKelas(sol.id_soal)} >
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
                                    <span className="navbar-brand mb-0 h1">Kumpulan Soal</span>
                                    <div className="float-end">
                                        <Link href="/dosen/soal/tambah">
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
                                            <th scope="col">Judul Soal</th>
                                            <th scope="col">Modul</th>
                                            <th scope="col">Keyword</th>
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
    const baseApiUrl = `${origin}/api/soal`;
    const result = await fetch(baseApiUrl)
    const soal = await result.json();

    return {
        props: {
            baseApiUrl,
            profil,
            soal: soal,
        },
    };
}

  