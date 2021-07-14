import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faSave, faWindowRestore, faTimesCircle, faCheckCircle, faGift, faCandyCane} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { soalService } from '../../../../services';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function Soal({profil, soal, soal_all, solusi_latihan, kelas_material}){
    const { register, handleSubmit, formState, setValue } = useForm();
    const { errors } = formState;

    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }

    // simpan & data
    const [stateFormMessage, setStateFormMessage] = useState(0);
    async function onSubmit(data) {
        const id_code = uuidv4();
        const data_solusi = {
            "id_code": id_code,
            "code": data.code,
            "status_code": 1, // selesai dikerjakan
            "nilai": "",
            "status_nilai": "", // selesai dinilai
            "nim_mhs": profil.nim_nidn,
            "nama_mhs": profil.name,
            "email_mhs": profil.email,
            "id_soal": soal.id_soal,
            "nama_soal": soal.nama_soal,
            "id_modul": soal.id_modul,
            "nama_modul": soal.nama_modul,
            "id_kelas_material": soal.id_kelas_material,
            "semester": soal.semester,
            "nama_semester": soal.nama_semester,
            "prodi": soal.prodi,
            "nama_prodi": soal.nama_prodi,
            "nama_dosen": soal.name, //nama dosen
            "nim_nidn": soal.nim_nidn, //nidn dosen
            "_id_user": soal._id, //id dosen
            "createAt": moment().format("DD-MM-YYYY hh:mm:ss"),
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss")
        }
        const result = await soalService.saveSolusi(data_solusi);
        if (result.error === false) {
            refreshData();
        }
    }

    // Run & compile
    const [datarun, setDatarun] = useState(0);
    function run(data) {
        setDatarun('Progress');
        runApi(data);
    }
    async function runApi(data) { //async
        const result = await soalService.getRun(data);
        setDatarun(result.status);
    }

    // coundown 
    const [secs, setSecs] = useState(0);
    const [mins, setMins] = useState(kelas_material.waktu_mengerjakan)
    const [solusi, setSolusi] = useState(0)

    useEffect(() => {
        const timerId = setInterval(() => {
            if (secs <= 0) {
                if (mins <= 0) {
                    setSolusi(1)
                }else {
                    setMins(m => m - 1)
                    setSecs(59)
                }
            }else{ 
                setSecs(s => s - 1)
            }
        }, 1000)
        return () => clearInterval(timerId);
    }, [secs, mins])

    return(
        <div>
            {!profil ? (
                <Login />
            ) : (
                <>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Latihan Minggu Ke -1</span>
                                    <div className="float-end">
                                        Sisa Waktu Pengerjaan :  <b>{mins} Menit :{secs < 10 && 0}{secs} Detik</b>
                                    </div>
                                </div>
                            </nav>
                            <div className="pb-3"></div>
                            <div className="row">
                                <div className="col-sm-5">
                                    <ul className="list-group mt-4">
                                    {soal_all.map((soal, index) => (
                                        <li className="list-group-item d-flex justify-content-between align-items-start"  key={index}>
                                            <div className="ms-2 me-auto">
                                            <div className="fw-bold">Soal : {soal.nama_soal}</div>
                                            </div>
                                            <div className="float-end">
                                                <Link href={"/mahasiswa/soal/"+ soal.id_kelas_material +"/"+ soal.id_soal }>
                                                    <button type="button" className="btn btn-primary btn-sm">
                                                        <FontAwesomeIcon icon={ faWindowRestore }/> Kerjakan 
                                                    </button>
                                                </Link>
                                            </div>
                                        </li>
                                    ))}
                                    </ul>
                                    <div className="card mt-4">
                                        <div className="card-body p-4">
                                            <div className="fw-bold">
                                                Detail Soal : {soal.nama_soal}
                                            </div>
                                            <p>Modul : {soal.nama_modul}</p>
                                            <p>
                                                {soal.deskripsi_soal}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {solusi_latihan.exist === 1 ? (
                                            <>
                                                <p className="card-text highlight">
                                                    <FontAwesomeIcon icon={ faGift }/> Selamat Anda telah mengerjakan soal <b>{soal.nama_soal}</b>
                                                    {' '}<FontAwesomeIcon icon={ faCandyCane }/>    
                                                </p>
                                            </>
                                        ):(
                                            <>
                                                <p className="card-text highlight">
                                                    Bahasa Pemrograman : {soal.bahasa_pemrograman} <br/>
                                                    Running Time : {soal.runnig_time} <br />
                                                    Soal : {soal.nama_soal}
                                                </p>
                                                {errors.code && errors.code.type === "required" && <>
                                                    <div className="alert alert-danger" role="alert">
                                                        <FontAwesomeIcon icon={ faTimesCircle }/> Code Program Wajib Anda Isi <br /> 
                                                    </div>
                                                </>}
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
                                                <textarea className="form-control" style={{height: 300}} placeholder="Silahkan Ketikan Kode Anda" {...register("code", {required: true})} >
                                                    {solusi_latihan.code}
                                                </textarea>
                                                <div className="btn-group mt-3">
                                                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                                                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span> }
                                                        {' '} <FontAwesomeIcon icon={ faSave }/> Simpan Code & Akhiri Pengerjaan Soal
                                                    </button>
                                                    <button className="btn btn-primary active" onClick={handleSubmit(run)}  >
                                                        <FontAwesomeIcon icon={ faPlayCircle }/> Run & Compile
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                    {!datarun ? (
                                        <p></p>
                                    ) : (    
                                        <div className="alert alert-primary mt-3 data_run" role="alert">
                                            {datarun == 'Progress' ?(
                                                <>
                                                <span className="spinner-border spinner-border-sm mr-2"></span> {datarun}
                                                </>
                                            ):(
                                                <>
                                                {datarun}
                                                </>
                                            )}  
                                        </div>                            
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    );
}


export async function getServerSideProps(context) {
    const { req, query } = context; // id_kelas_material / id_soal
    const { data } = getAppCookies(req);
    const { origin } = absoluteUrl(req);
    const profil = data ? verifyToken(data) : '';
    
    const baseApiUrl = `${origin}/api/soal/${query.id_kelas_material}/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const soal = await result.json();
    
    const baseApiUrl_solusi = `${origin}/api/soal/solusi/exist/${query.pid}`;
    const result_solusi = await fetch(baseApiUrl_solusi)
    const solusi_latihan = await result_solusi.json();

    const baseApiUrl_soal_all = `${origin}/api/soal/kelas_material/${query.id_kelas_material}`;
    const result_soal_all = await fetch(baseApiUrl_soal_all)
    const soal_all = await result_soal_all.json();

    const baseApiUrl_kelas_material = `${origin}/api/kelas_material/${query.id_kelas_material}`;
    const result_kelas_material = await fetch(baseApiUrl_kelas_material)
    const kelas_material = await result_kelas_material.json();

    return {
        props: {
            profil,
            soal,
            soal_all,
            solusi_latihan,
            kelas_material
        }
    };
}