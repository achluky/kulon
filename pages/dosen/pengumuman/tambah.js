import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowAltCircleLeft, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css';
import Side from '../../../components/dosen_sidebar';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    absoluteUrl,
    getAppCookies,
    verifyToken
} from '../../../utility/utils';
import Login from '../../../components/login';
import { pengumumanService } from '../../../services';
import { useState } from 'react';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';


export default function Tambah({profil, prodis, semesters}){
    const [stateFormMessage, setStateFormMessage] = useState({});
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    async function onSubmit(data) {
        const id_pengumuman = uuidv4();
        const data_smt  = data.semester.split("_");
        const data_prodi  = data.prodi.split("_");
        const pengumuman = {
            "id_pengumuman": id_pengumuman,
            "judul": data.judul,
            "pengumuman": data.pengumuman,
            "semester": data_smt[0],
            "nama_semester": data_smt[1],
            "prodi": data_prodi[0],
            "nama_prodi": data_prodi[1],
            "nim_nidn": profil.nim_nidn,
            "_id_user": profil._id,
            "createAt": moment().format("DD-MM-YYYY hh:mm:ss"),
            "updateAt": moment().format("DD-MM-YYYY hh:mm:ss"),
            "nama_dosen": profil.name,
            "delete": "0"
        }
        const result = await pengumumanService.savePengumuman(pengumuman);
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
                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Tambah : Pengumuman</span>
                                <div className="float-end">
                                    <Link href="/dosen/pengumuman">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                        <div className="pb-3"></div>
                        <div className="card">
                            <div className="card-body">

                                <div className="alert alert-primary" role="alert">
                                    Tambahkan Informasi Pengumuman. <br />
                                    {errors.nama_soal && errors.nama_soal.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Nama Soal wajib diisi <br /> </>}
                                    {errors.nama_modul && errors.nama_modul.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Nama Modul wajib diisi <br /> </>}
                                    {errors.deskripsi_soal && errors.deskripsi_soal.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Deskripsi Soal wajib diisi <br /> </>}
                                    {errors.semester && errors.semester.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Semester wajib diisi <br /></>}
                                    {errors.prodi && errors.prodi.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Program Studi wajib diisi <br /></>}
                                    {errors.keyword && errors.keyword.type === "required" && <><FontAwesomeIcon icon={ faTimesCircle }/> Keyword wajib diisi <br /></>}
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
                                        <input type="text" className="form-control" placeholder="A.1" {...register("judul", {required: true})} />
                                        <label>Judul Pengumuman</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" style={{height: 100}} placeholder="Deskripsi" {...register("pengumuman", {required: true})}  ></textarea>
                                        <label>Deskripsi Pengumuman</label>
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
                                        <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2">
                                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                                            <FontAwesomeIcon icon={ faSave }/> Simpan Data
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
    const { req } = context;
    const { origin } = absoluteUrl(req);
    const { data } = getAppCookies(req);
    
    const profil = data ? verifyToken(data) : '';
    const baseApiUrl_prodi = `${origin}/api/prodi`;
    const result_prodi = await fetch(baseApiUrl_prodi)
    const prodis = await result_prodi.json();

    const baseApiUrl_semester = `${origin}/api/semester`;
    const result_semester = await fetch(baseApiUrl_semester)
    const semesters = await result_semester.json();

    return {
        props: {
            profil,
            prodis,
            semesters
        },
    };

}