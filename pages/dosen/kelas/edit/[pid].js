import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';

import Side from '../../../../components/dosen_sidebar';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../../utility/utils';
import Login from '../../../../components/login';
import { kelasService } from '../../../../services';
import { useState } from 'react';
import moment from "moment";

export default function Edit({kelas, profil, prodis, semesters}){
    const [stateFormMessage, setStateFormMessage] = useState({});
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            id_kelas: kelas.id_kelas,
            nama_kelas : kelas.nama_kelas,
            semester : kelas.semester+'_'+kelas.nama_semester,
            prodi : kelas.prodi+'_'+kelas.nama_prodi,
        }
    });
    const { errors } = formState;
    async function onSubmit(data) {
        const data_smt  = data.semester.split("_");
        const data_prodi  = data.prodi.split("_");
        const kelas = {
            "id_kelas": data.id_kelas,
            "nama_kelas": data.nama_kelas,
            "semester": data_smt[0],
            "nama_semester": data_smt[1],
            "prodi": data_prodi[0],
            "nama_prodi": data_prodi[1],
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss")
        }
        const result = await kelasService.updateKelas(kelas);
        setStateFormMessage(result);
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
                                <span className="navbar-brand mb-0 h1">Edit : Kelas Perkuliahan</span>
                                <div className="float-end">
                                    <Link href="/dosen/kelas">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>

                        <div className="card">
                            <div className="card-body">
                                
                                <div className="alert alert-primary" role="alert">
                                    Tambahkan Informasi Terkait kelas Perkuliahan. <br />
                                    {errors.nm_kelas && errors.nm_kelas.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Nama Kelas wajib diisi <br /> </>}
                                    {errors.semester && errors.semester.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Semester wajib diisi <br /></>}
                                    {errors.prodi && errors.prodi.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Program Studi wajib diisi <br /></>}
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
                                
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-floating mb-3">
                                        <input type="hidden" className="form-control" {...register("id_kelas", {required: true})} />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" placeholder="A.1" {...register("nama_kelas", {required: true})} />
                                        <label>Nama Kelas</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" {...register("semester", { required: true })} >
                                            <option value="">Pilih Semester</option>
                                            {semesters.map((semester)=>{
                                                return (
                                                    <option value={semester.id_semester+'_'+semester.nama_semester} key={semester.id_semester}>{semester.nama_semester}</option>
                                                )
                                            })}
                                        </select>
                                        <label >Semester</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" {...register("prodi", { required: true })} >
                                            <option value="">Pilih Prodi</option>
                                            {prodis.map((prodi)=>{
                                                return (
                                                    <option value={prodi.id_prodi+'_'+prodi.nama_prodi} key={prodi.id_prodi}>{prodi.nama_prodi}</option>
                                                )
                                            })}
                                        </select>
                                        <label >Program Studi</label>
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary btn-lg mr-2">
                                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                                            <FontAwesomeIcon icon={ faSave }/> Perbaharui Data
                                        </button>
                                        
                                    </div>
                                </form>
                                
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

    const { req, query } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);

    const profil = data ? verifyToken(data) : '';
    const baseApiUrl = `${origin}/api/kelas/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const kelas = await result.json();

    const baseApiUrl_prodi = `${origin}/api/prodi`;
    const result_prodi = await fetch(baseApiUrl_prodi)
    const prodis = await result_prodi.json();

    const baseApiUrl_semester = `${origin}/api/semester`;
    const result_semester = await fetch(baseApiUrl_semester)
    const semesters = await result_semester.json();

    return {
        props: {
            baseApiUrl,
            profil,
            kelas: kelas,
            prodis,
            semesters
        },
    };
}
