import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faArrowAltCircleLeft, faTimesCircle, faCheckCircle, faFire } from '@fortawesome/free-solid-svg-icons'
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
import { soalService } from '../../../services';
import { useState } from 'react';
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';


export default function Tambah({profil, prodis, semesters, modul, kelas_material}){
    const [stateFormMessage, setStateFormMessage] = useState({});
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    
    async function onSubmit(data) {
        const id_soal = uuidv4();
        const data_smt  = data.semester.split("_");
        const data_prodi  = data.prodi.split("_");
        const data_modul  = data.nama_modul.split("_");
        const soal = {
            "id_soal": id_soal,
            "nama_soal": data.nama_soal,
            "id_modul": data_modul[0],
            "nama_modul": data_modul[1],
            "keyword": data.keyword,
            "id_kelas_material": data.id_kelas_material,
            "deskripsi_soal": data.deskripsi_soal,
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
        const result = await soalService.saveSoal(soal);
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
                                <span className="navbar-brand mb-0 h1">Tambah : Soal Latihan</span>
                                <div className="float-end">
                                    <Link href="/dosen/soal">
                                        <button type="button" className="btn btn-primary btn-sm"><FontAwesomeIcon icon={ faArrowAltCircleLeft }/> Kembali </button>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                        <div className="pb-3"></div>
                        <div className="card">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="card-body">
                                    <div className="alert alert-primary" role="alert">
                                        Tambahkan Informasi Terkait Soal & User Case <br />
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
                                </div>

                                <span className="navbar-brand mb-0 ms-3 lead "><FontAwesomeIcon icon={ faFire }/> Informasi Soal</span>
                                
                                <div className="card-body">
                                   
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" placeholder="A.1" {...register("nama_soal", {required: true})} />
                                        <label>Nama Soal</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea className="form-control" style={{height: 200}} placeholder="Deskripsi" {...register("deskripsi_soal", {required: true})}  ></textarea>
                                        <label>Deskripsi Soal</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" placeholder="Materi kelas" {...register("id_kelas_material", { required: true })} >
                                            <option value="">Ke - </option>
                                            {kelas_material.map((mingguke)=>{
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
                                </div>
                                
                                <span className="navbar-brand mb-0 ms-3 lead "><FontAwesomeIcon icon={ faFire }/> Mentukan Use Case (Masukan & Keluaran)</span>
                                
                                <div className="card-body">
                                    <div class="row g-3">
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("masukan1", {required: true})} />
                                                <label>Masukan 1</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("keluaran1", {required: true})} />
                                                <label>Keluaran  1</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-3">
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("masukan2", {required: true})} />
                                                <label>Masukan 2</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("keluaran2", {required: true})} />
                                                <label>Keluaran  2</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-3">
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("masukan3", {required: true})} />
                                                <label>Masukan 3</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("keluaran3", {required: true})} />
                                                <label>Keluaran  3</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row g-3">
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("masukan4", {required: true})} />
                                                <label>Masukan 4</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("keluaran4", {required: true})} />
                                                <label>Keluaran  4</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row g-3">
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("masukan5", {required: true})} />
                                                <label>Masukan 5</label>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="form-floating mb-3 md-1">
                                                <input type="text" className="form-control" placeholder="A.1" {...register("keluaran5", {required: true})} />
                                                <label>Keluaran  5</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-body">
                                    <div className="d-grid gap-2">
                                        <button type="submit" disabled={formState.isSubmitting} className="w-100 btn btn-primary mr-2">
                                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-2"></span>} {' '}
                                            <FontAwesomeIcon icon={ faSave }/> Simpan Data Soal
                                        </button>
                                    </div>
                                </div>
                            </form>

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

    const baseApiUrl_modul = `${origin}/api/modul`;
    const result_modul = await fetch(baseApiUrl_modul)
    const modul = await result_modul.json();

    const baseApiUrl_kelas_material = `${origin}/api/kelas_material/nidn/${profil.nim_nidn}`;
    const result_kelas_material = await fetch(baseApiUrl_kelas_material)
    const kelas_material  = await result_kelas_material.json();

    return {
        props: {
            profil,
            prodis,
            semesters,
            modul,
            kelas_material
        },
    };

}