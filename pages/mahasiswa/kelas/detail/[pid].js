import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faInfoCircle, faUserPlus, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../../components/mahasiswa_sidebar';
import Login from '../../../../components/login';
import Link from 'next/link';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import { useForm } from 'react-hook-form';
import { Kelas_mahasiswaService } from '../../../../services';
import { useState } from 'react';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export default function Detail({kelas, profil, status_peserta_kelas}){
    const [stateFormMessage, setStateFormMessage] = useState({});
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    async function onSubmit(data) {
        if (data.kode_kelas ===  kelas.kode_kelas) {
            const id_kelas_mahasiswa = uuidv4();
            const kelas_mahasiswa = {
                "id_kelas_mahasiswa": id_kelas_mahasiswa,
                "kode_kelas": data.kode_kelas,
                "nim": profil.nim_nidn,
                "nama_mhs": profil.name,
                "id_kelas": kelas.id_kelas,
                "nama_kelas": kelas.nama_kelas,
                "nidn": kelas.nim_nidn,
                "nama_dosen": kelas.nama_dosen,
                "semester": kelas.semester,
                "nama_semester": kelas.nama_semester,
                "prodi": kelas.prodi,
                "nama_prodi": kelas.nama_prodi,
                "createAt": moment().format("DD-MM-YYYY hh:mm:ss"),
                "updateAt": moment().format("DD-MM-YYYY hh:mm:ss"),
                "revoke": "0"
            }
            const result = await Kelas_mahasiswaService.savekelas_mahasiswa(kelas_mahasiswa);
            setStateFormMessage(result);
        }else{
            setStateFormMessage({
                error: true,
                message: "Kode Kelas Tidak Sama. Silahkan Tanyakan Ke Dosen Kelas Anda."
            });
        }
    }
    return(
        <div>
            {!profil ? (
                <Login />
            ) : (
                <div className="row">
                    <div className="col-sm-3">
                        <Side />
                    </div>
                    <div className="col-sm-9">
                        <div className="col-sm-12">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container-fluid">
                                    <span className="navbar-brand mb-0 h1">Informasi : Kelas Perkuliahan</span>
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
                                        <label className="col-sm-3 col-form-label">Nama Kelas</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_kelas}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Semester</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_semester}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Program Studi</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_prodi}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label  className="col-sm-3 col-form-label">Dosen Pengajar</label>
                                        <div className="col-sm-9">
                                        <label className="col-sm-10 col-form-label">: {kelas.nama_dosen}</label>
                                        </div>
                                    </div>       
                                </div>
                            </div>
                            <div className="pb-3"></div>
                            {status_peserta_kelas===true ? (
                                <>
                                    <div className="alert alert-primary" role="alert">
                                    <FontAwesomeIcon icon={ faInfoCircle }/> Selamat Anda Sudah terdaftar di kelas ini
                                    </div>
                                </>
                            ):(
                                <>
                                <div className="alert alert-primary" role="alert">
                                    <FontAwesomeIcon icon={ faInfoCircle }/> Masuk Ke dalam Kelas? Masukan kode kelas dari dosen anda. Klik Tombol Masuk sebagai peserta kelas. <br />
                                    {errors.kode_kelas && errors.kode_kelas.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Kode Kelas wajib diisi  </>}
                                </div>

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
                                    <div className="card-body p-4">
                                        <div className=" row">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3">
                                                    <label className="form-label">Kode Kelas</label>
                                                    <input type="input" className="form-control" placeholder="Masukan Kode Kelas" {...register("kode_kelas", {required: true})}/>
                                                    <div className="form-text">Kode Kelas merupakan kode rahasia yang akan diberikan oleh dosen untuk mahasiswa yang diizinkan masuk dalam suatu kelas</div>
                                                </div>
                                                <div className="mb-3">
                                                    <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2">
                                                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                                                        <FontAwesomeIcon icon={ faUserPlus }/> Masuk Sebagai Peserta Kelas
                                                    </button>
                                                    
                                                </div>
                                            </form>
                                        </div>                                
                                    </div>
                                </div>
                                </>
                            )}
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
    const baseApiUrl = `${origin}/api/kelas/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();

    const baseApiUrl_peserta_kelas = `${origin}/api/kelas_mahasiswa/peserta_kelas/${query.pid}?nim=${profil.nim_nidn}`;
    const result_peserta_kelas= await fetch(baseApiUrl_peserta_kelas)
    const peserta_kelas = await result_peserta_kelas.json();
    
    console.log(peserta_kelas.status);

    return {
        props: {
            profil,
            kelas: kelas,
            status_peserta_kelas: peserta_kelas.status
        },
    };
}
