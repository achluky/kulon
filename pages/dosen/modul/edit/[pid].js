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
import { modulService } from '../../../../services';
import { useState } from 'react';
import moment from "moment";

export default function Edit({modul, profil, prodis, semesters}){
    const [stateFormMessage, setStateFormMessage] = useState({});
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            id_modul: modul.id_modul,
            nama_modul : modul.nama_modul,
            semester : modul.semester+'_'+modul.nama_semester,
            prodi : modul.prodi+'_'+modul.nama_prodi,
            deskripsi_modul : modul.deskripsi_modul
        }
    });
    const { errors } = formState;
    async function onSubmit(data) {
        const data_smt  = data.semester.split("_");
        const data_prodi  = data.prodi.split("_");
        const modul = {
            "id_modul": data.id_modul,
            "nama_modul": data.nama_modul,
            "nama_file": data.nama_file[0].name,
            "deskripsi_modul": data.deskripsi_modul,
            "semester": data_smt[0],
            "nama_semester": data_smt[1],
            "prodi": data_prodi[0],
            "nama_prodi": data_prodi[1],
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss")
        }
        const result = await modulService.updateModul(modul);
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
                                <span className="navbar-brand mb-0 h1">Edit : Modul Perkuliahan</span>
                                <div className="float-end">
                                    <Link href="/dosen/modul">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>

                        <div className="card">
                            <div className="card-body">
                                
                                <div className="alert alert-primary" role="alert">
                                    Tambahkan Informasi Terkait Modul Perkuliahan. <br />
                                    {errors.nama_modul && errors.nama_modul.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Nama Kelas wajib diisi <br /> </>}
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
                                        <input type="hidden" className="form-control" {...register("id_modul", {required: true})} />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Modul" {...register("nama_modul", {required: true})} />
                                        <label>Nama Modul</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" placeholder="Deskripsi" style={{height: 100}} {...register("deskripsi_modul", {required: true})} rows={100} ></textarea>
                                        <label>Deskripsi</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" placeholder="Semester" {...register("semester", { required: true })} >
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
                                        <select className="form-select" placeholder="Program Studi" {...register("prodi", { required: true })} >
                                            <option value="">Pilih Prodi</option>
                                            {prodis.map((prodi)=>{
                                                return (
                                                    <option value={prodi.id_prodi+'_'+prodi.nama_prodi} key={prodi.id_prodi}>{prodi.nama_prodi}</option>
                                                )
                                            })}
                                        </select>
                                        <label >Program Studi</label>
                                    </div>
                                    <div className="mb-3">
                                        <small>Dokumen Modul</small>
                                        <input
                                            type="file"
                                            className="form-control"
                                            {...register("nama_file", { required: true })}
                                        />
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
    const baseApiUrl = `${origin}/api/modul/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const modul = await result.json();

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
            modul: modul,
            prodis,
            semesters
        },
    };
}
