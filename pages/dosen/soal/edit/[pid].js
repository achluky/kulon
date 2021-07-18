import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faSave, faTimesCircle, faCheckCircle, faFileCode, faFire, faVials } from '@fortawesome/free-solid-svg-icons'
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
import { soalService } from '../../../../services';
import { useState, useEffect } from 'react';
import moment from "moment";

export default function Edit({origin, soal, profil, prodis, semesters, modul, kelasmaterial}){
    const [stateFormMessage, setStateFormMessage] = useState({});
    
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            id_soal: soal.id_soal,
            nama_soal : soal.nama_soal,
            keyword: soal.keyword,
            id_kelas_material: soal.id_kelas_material,
            semester : soal.semester+'_'+soal.nama_semester,
            prodi : soal.prodi+'_'+soal.nama_prodi,
            deskripsi_soal : soal.deskripsi_soal,
            nama_modul : soal.id_modul+'_'+soal.nama_modul
        }
    });
    const { errors } = formState;
    async function onSubmit(data) {
        const data_smt  = data.semester.split("_");
        const data_prodi  = data.prodi.split("_");
        const data_modul  = data.nama_modul.split("_");
        const modul = {
            "id_soal": data.id_soal,
            "nama_soal": data.nama_soal,
            "deskripsi_soal": data.deskripsi_soal,
            "id_kelas_material": data.id_kelas_material,
            "keyword": data.keyword,
            "semester": data_smt[0],
            "nama_semester": data_smt[1],
            "prodi": data_prodi[0],
            "nama_prodi": data_prodi[1],
            "id_modul": data_modul[0],
            "nama_modul": data_modul[1],
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss")
        }
        const result = await soalService.updateSoal(modul);
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
                                <span className="navbar-brand mb-0 h1">Edit : Soal</span>
                                <div className="float-end">
                                    <Link href="/dosen/soal">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>


                        <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="alert alert-primary" role="alert">
                            Tambahkan Informasi Terkait Soal. <br />
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
                        
                        <div className="card">
                            <div className="card-body">
                                    <div className="form-floating mb-3">
                                        <input type="hidden" className="form-control" {...register("id_soal", {required: true})} />
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Soal" {...register("nama_soal", {required: true})} />
                                        <label>Judul/Nama Soal</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" placeholder="Deskripsi" style={{height: 200}} {...register("deskripsi_soal", {required: true})} rows={200} ></textarea>
                                        <label>Deskripsi</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                            <select className="form-select" placeholder="Materi kelas" {...register("id_kelas_material", { required: true })} >
                                                <option value="">Ke - </option>
                                                {kelasmaterial.map((mingguke)=>{
                                                    return (
                                                        <option value={mingguke.id_kelas_material} key={mingguke.id_kelas_material}>Kelas {mingguke.nama_kelas} Minggu Ke-{mingguke.minggu_ke} Semester {mingguke.nama_semester}</option>
                                                    )
                                                })}
                                            </select>
                                        <label>Materi Kelas</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" {...register("nama_modul", { required: true })} >
                                            <option value="">Pilih Modul</option>
                                            {modul.map((mod)=>{
                                                return (
                                                    <option value={mod.id_modul+'_'+mod.nama_modul} key={mod.id_modul}>{mod.nama_modul}</option>
                                                )
                                            })}
                                        </select>
                                        <label >Modul</label>
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
                            </div>
                        </div>
            
                        <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2 mt-3">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                            <FontAwesomeIcon icon={ faSave }/> Perbaharui Data
                        </button>

                        <Link href={'/dosen/soal/testcase/'+soal.id_soal}>
                            <button  className="w-100 btn btn-warning mr-2 mt-3">
                                <FontAwesomeIcon icon={ faVials }/> Edit Test Case
                            </button>
                        </Link>
                        
                        </form>
                                
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
    const baseApiUrl = `${origin}/api/soal/${query.pid}`;
    const result = await fetch(baseApiUrl)
    const soal = await result.json();

    const baseApiUrl_prodi = `${origin}/api/prodi`;
    const result_prodi = await fetch(baseApiUrl_prodi)
    const prodis = await result_prodi.json();

    const baseApiUrl_semester = `${origin}/api/semester`;
    const result_semester = await fetch(baseApiUrl_semester)
    const semesters = await result_semester.json();

    const baseApiUrl_modul = `${origin}/api/modul`;
    const result_modul = await fetch(baseApiUrl_modul)
    const modul = await result_modul.json();

    const baseApiUrl_kelas_material = `${origin}/api/kelas_material/nidn/${profil.nim_nidn}`;
    const result_kelas_material = await fetch(baseApiUrl_kelas_material)
    const kelasmaterial  = await result_kelas_material.json();

    return {
        props: {
            origin,
            soal: soal,
            profil,
            prodis,
            semesters,
            modul,
            kelasmaterial
        },
    };
}
