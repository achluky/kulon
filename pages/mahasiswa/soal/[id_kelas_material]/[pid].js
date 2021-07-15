import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faSave, faWindowRestore, faTimesCircle, faCheckCircle, faGift, faCandyCane, faListAlt} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { soalService } from '../../../../services';
import { useRouter } from 'next/router';
import CodeEditor from '../../../../components/module_with_editor';

export default function Soal({profil, soal, solusi_latihan, id_kelas_material}){
    const { handleSubmit, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    }

    function onChange(newValue) {
        console.log("change", newValue);
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
    const [mins, setMins] = useState(100)
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

                            <Link href={"/mahasiswa/soal/mingguan/"+ id_kelas_material}>
                            <button type="button" className="btn btn-primary mb-4">
                                <FontAwesomeIcon icon={ faListAlt }/> Daftar Soal
                            </button>
                            </Link>

                            <nav className="navbar navbar-light bg-light mb-4">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Latihan Minggu Ke -1 [ <small>{soal.nama_soal} ] </small></span>
                                    <div className="float-end">
                                        Sisa Waktu Pengerjaan :  <b>{mins} Menit :{secs < 10 && 0}{secs} Detik</b>
                                    </div>
                                </div>
                            </nav>
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#">Deskripsi</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link disabled" href="#" >Nilai</a>
                                        </li>
                                    </ul>
                                    <div className="card mt-4">
                                        <div className="card-body p-4">

                                            <p className="">
                                                Modul : {soal.nama_modul}  <br/>
                                                Bahasa Pemrograman : {soal.bahasa_pemrograman} <br/>
                                                Running Time : {soal.runnig_time}
                                            </p>
                                            <p>
                                                {soal.deskripsi_soal}
                                            </p>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3 mt-4">
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="">Pilih Bahasa Pemrograman</option>
                                        <option value="python">Python</option>
                                        <option value="cpp">C++</option>
                                        <option value="c">C</option>
                                        <option value="java">Java</option>
                                    </select>
                                </div>

                                <div className="col-sm-12 mt-4">
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
                                                <CodeEditor
                                                    name="code"
                                                    onChange={onChange}
                                                    mode="javascript"
                                                    theme="monokai"
                                                    showPrintMargin={false}
                                                    width="100%"
                                                    style={{ height: '400px' }}
                                                    showPrintMargin
                                                    showGutter
                                                    highlightActiveLine
                                                    value=""
                                                    editorProps={{
                                                        $blockScrolling: true,
                                                        enableBasicAutocompletion: true,
                                                        enableLiveAutocompletion: true,
                                                        enableSnippets: true,
                                                    }}
                                                    setOptions={{
                                                        showLineNumbers: true,
                                                        tabSize: 2,
                                                    }}
                                                />
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

    return {
        props: {
            profil,
            soal,
            solusi_latihan,
            id_kelas_material : query.id_kelas_material
        }
    };
}